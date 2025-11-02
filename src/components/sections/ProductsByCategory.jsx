import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Category } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import Wrapper from "../layout/Wrapper";
import Loading from "../Loading";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "@mui/material/styles";
import colors from "../../theme/colors";

const PRODUCTS_PER_PAGE = {
  xs: 4,
  sm: 6,
  md: 10,
};

const ProductsByCategory = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));

  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE.xs);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: categories, loading: loadingCategories } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  const { data: products, loading: loadingProducts } = useFetch(
    selectedCategory 
      ? `https://fakestoreapi.com/products/category/${selectedCategory}` 
      : null
  );

  const getProductsPerPage = useCallback(() => {
    if (isXs) return PRODUCTS_PER_PAGE.xs;
    if (isSm) return PRODUCTS_PER_PAGE.sm;
    return PRODUCTS_PER_PAGE.md;
  }, [isXs, isSm]);

  useEffect(() => {
    if (categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    setVisibleCount(getProductsPerPage());
  }, [selectedCategory, getProductsPerPage]);

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => prev + getProductsPerPage());
  }, [getProductsPerPage]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const displayedProducts = useMemo(() => 
    products?.slice(0, visibleCount) || [],
    [products, visibleCount]
  );

  const hasMoreProducts = useMemo(() => 
    products && visibleCount < products.length,
    [products, visibleCount]
  );

  const isLoading = loadingCategories || loadingProducts;

  return (
    <Wrapper>
      <Box
        component="section"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={{ xs: 2, sm: 3 }}
        px={{ xs: 2, sm: 3 }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
          <Category
            sx={{
              color: colors["--clr-yellow-1"],
              mr: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
            }}
          >
            Products by Category
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: 60, sm: 80, md: 100 },
            height: 4,
            bgcolor: colors["--clr-yellow-1"],
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color: colors["--clr-gray-2"],
            mt: 1,
            fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Explore products from the most popular categories
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 0.5, sm: 1 },
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        {categories?.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? "outlined" : "contained"}
            sx={{
              textTransform: "capitalize",
              bgcolor: colors["--clr-yellow-2"],
              color: colors["--clr-black-1"],
              borderRadius: 3,
              borderColor: colors["--clr-black-1"],
              px: { xs: 2, sm: 2.5, md: 3 },
              py: { xs: 0.7, sm: 0.9, md: 1 },
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.9rem" },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      {isLoading ? (
        <Loading text="Loading products..." />
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)", 
                sm: "repeat(auto-fill, minmax(250px, 1fr))"
              },
              gap: { xs: 1.5, sm: 2, md: 2.5 },
              justifyContent: "center",
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {displayedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ProductCard product={p} />
              </Link>
            ))}
          </Box>

          {hasMoreProducts && (
            <Box 
              display="flex" 
              justifyContent="center" 
              mt={{ xs: 3, sm: 3.5, md: 4 }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleShowMore}
                sx={{
                  bgcolor: colors["--clr-white-6"],
                  color: colors["--clr-black-1"],
                  px: { xs: 3, sm: 3.5, md: 4 },
                  py: { xs: 1.2, sm: 1.3, md: 1.5 },
                  fontWeight: 600,
                  borderRadius: 15,
                  textTransform: "none",
                  fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                  "&:hover": {
                    bgcolor: colors["--clr-gray-8"],
                  },
                }}
              >
                Show more
              </Button>
            </Box>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default ProductsByCategory