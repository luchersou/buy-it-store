import { useMemo } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import EmblaBase from "../carousel/EmblaBase";
import Autoplay from "embla-carousel-autoplay";
import colors from "../../theme/colors";

const images = [
  "/images/banner/banner1.jpg",
  "/images/banner/banner2.jpg",
  "/images/banner/banner3.jpg",
];

const Banner = () => {
  const autoplayPlugin = useMemo(() => 
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ,[]);

  const { 
    emblaRef, 
    selectedIndex, 
    scrollSnaps, 
    scrollPrev, 
    scrollNext, 
    scrollTo 
  } = EmblaBase({
    options: { loop: true, align: "center" },
    plugins: [autoplayPlugin],
  });

  const arrowStyles = {
    display: { xs: "none", sm: "flex" },
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    color: colors["--clr-white-1"],
    backgroundColor: colors["--clr-black-overlay-40"],
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: colors["--clr-black-overlay-60"],
      transform: "translateY(-50%) scale(1.1)",
    },
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        aspectRatio: { xs: "16/9", sm: "21/9" },
        maxHeight: { xs: 400, sm: 500, md: 590 },
      }}
    >
      <IconButton
        onClick={scrollPrev}
        sx={{
          ...arrowStyles,
          left: { sm: 20, md: 30 },
        }}
      >
        <ChevronLeft sx={{ fontSize: { sm: 28, md: 36 } }} />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        aria-label="Next banner"
        sx={{
          ...arrowStyles,
          right: { sm: 20, md: 30 },
        }}
      >
        <ChevronRight sx={{ fontSize: { sm: 28, md: 36 } }} />
      </IconButton>

      <Box 
        ref={emblaRef} 
        sx={{ 
          overflow: "hidden", 
          width: "100%", 
          height: "100%",
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          {images.map((src, i) => (
            <Box 
              key={i} 
              sx={{ 
                flex: "0 0 100%", 
                height: "100%",
                minWidth: 0, 
              }}
            >
              <Box
                component="img"
                src={src}
                alt={`Banner ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 10, sm: 15, md: 20 },
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: { xs: 0.75, sm: 1 },
          zIndex: 10,
        }}
      >
        {scrollSnaps.map((_, index) => (
          <Box
            key={index}
            onClick={() => scrollTo(index)}
            role="button"
            sx={{
              width: { xs: 8, sm: 10, md: 12 },
              height: { xs: 8, sm: 10, md: 12 },
              borderRadius: "50%",
              cursor: "pointer",
              backgroundColor:
                index === selectedIndex
                  ? colors["--clr-white-1"]
                  : colors["--clr-white-overlay-50"],
              transition: "all 0.3s ease",
              border: `2px solid ${
                index === selectedIndex 
                  ? colors["--clr-white-1"] 
                  : "transparent"
              }`,
              transform: index === selectedIndex ? "scale(1.2)" : "scale(1)",
              "&:hover": {
                backgroundColor: colors["--clr-white-1"],
                transform: "scale(1.15)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Banner