import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import EmblaBase from "./EmblaBase";
import colors from "../../theme/colors";

const Carousel = ({ children, options = {}, plugins = [], arrowSize }) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { emblaRef, emblaApi, scrollPrev, scrollNext } = EmblaBase({
    options: {
      align: "start",
      dragFree: true,
      speed: 6,
      containScroll: "trimSnaps",
      ...options,
    },
    plugins,
  });

  const defaultArrowSizes = {
    xs: 28,
    sm: 36,
    md: 50,
  };

  const getArrowSize = () => {
    if (arrowSize) return arrowSize;
    return defaultArrowSizes;
  };

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    backgroundColor: colors["--clr-gray-10"],
    boxShadow: 1,
    width: { xs: 33, sm: 41, md: 55 }, 
    height: { xs: 33, sm: 41, md: 55 },
    "&:hover": { 
      backgroundColor: colors["--clr-gray-9"],
    },
  };

  return (
    <Box sx={{ position: "relative" }}>
      {canScrollPrev && (
        <IconButton
          onClick={scrollPrev}
          sx={{
            ...arrowStyles,
            left: { xs: -12, sm: -20, md: -28 },
          }}
        >
          <ChevronLeft sx={{ fontSize: getArrowSize(), }} />
        </IconButton>
      )}

      <Box
        ref={emblaRef}
        sx={{ 
          overflow: "hidden", 
          px: { xs: 2.5, sm: 5, md: 6.25 } 
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            gap: { xs: 1, sm: 1.5, md: 2 } 
          }}
        >
          {children}
        </Box>
      </Box>

      {canScrollNext && (
        <IconButton
          onClick={scrollNext}
          sx={{
            ...arrowStyles,
            right: { xs: -12, sm: -20, md: -28 },
          }}
        >
          <ChevronRight sx={{ fontSize: getArrowSize(), }} />
        </IconButton>
      )}
    </Box>
  );
}

export default Carousel;