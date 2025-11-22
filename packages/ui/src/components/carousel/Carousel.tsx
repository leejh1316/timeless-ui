"use client";

import { useArrowNavigation } from "../../hooks/useArrowNavigation";
import { useComposedRefs } from "../../hooks/useComposeRefs";
import clsx from "clsx";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { createContext, forwardRef, memo, useCallback, useContext, useEffect, useState } from "react";
import { Primitive, PrimitivePropsWithRef } from "../primitive/Primitive";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselModuleProps<E extends React.ElementType> = PrimitivePropsWithRef<E> & {
  carouselApi?: CarouselApi | null;
};

type CarouselProps = {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = (errorPass?: boolean) => {
  const context = useContext(CarouselContext);
  if (!context) {
    if (errorPass) return {} as CarouselContextProps;
    throw new Error("Carousel.* 컴포넌트는 Carousel.Root 안에서 사용해야 합니다.");
  }
  return context;
};

const useCarouselApi = (externalApi: CarouselApi | null) => {
  const contextApi = useCarousel(true)?.api;
  return externalApi || contextApi;
};

// =========== Carousel.Root ===========
const CarouselRoot = memo(
  forwardRef(
    (
      {
        orientation = "horizontal",
        options,
        setApi,
        onSelect,
        plugins,
        className,
        ...props
      }: PrimitivePropsWithRef<"div"> & CarouselProps,
      ref,
    ) => {
      const [carouselRef, api] = useEmblaCarousel(
        {
          ...options,
          axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
      );

      const composedRef = useComposedRefs(ref, carouselRef);

      useEffect(() => {
        if (!api || !setApi) return;
        setApi(api);
      }, [api, setApi]);
      return (
        <CarouselContext.Provider
          value={{
            carouselRef: composedRef,
            api: api,
            options,
            orientation: orientation || (options?.axis === "y" ? "vertical" : "horizontal"),
          }}
        >
          <Primitive.div
            className={clsx("relative", className)}
            role="region"
            aria-roledescription="carousel"
            data-slot="carousel"
            {...props}
          />
        </CarouselContext.Provider>
      );
    },
  ),
);
CarouselRoot.displayName = "Carousel.Root";

// =========== Carousel.Container ===========
const CarouselContainer = ({ className, ...props }: PrimitivePropsWithRef<"div">) => {
  const { carouselRef } = useCarousel();
  return (
    <Primitive.div
      ref={carouselRef}
      data-slot="carousel-container"
      className={clsx("overflow-hidden", className)}
      {...props}
    />
  );
};
CarouselContainer.displayName = "Carousel.container";

// =========== Carousel.Track ===========
const CarouselTrack = forwardRef<React.ElementRef<"div">, PrimitivePropsWithRef<"div">>(
  ({ className, ...props }, ref) => {
    const { orientation, api } = useCarousel();
    const { rootRef, handleKeyDown } = useArrowNavigation({
      selector: '[data-slot="carousel-item"]',
      orientation,
      onNavigate: ({ direction }) => {
        if (!api) return;
        if (direction === "next") {
          api.scrollNext();
        } else {
          api.scrollPrev();
        }
      },
    });
    const composedRef = useComposedRefs(ref, rootRef);
    return (
      <Primitive.div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={composedRef}
        className={clsx("flex", orientation === "horizontal" ? "" : "flex-col", className)}
        data-slot="carousel-track"
        {...props}
      />
    );
  },
);
CarouselTrack.displayName = "Carousel.track";

// =========== Carousel.Item ===========
const CarouselItem = memo(({ className, ...props }: PrimitivePropsWithRef<"div">) => {
  return (
    <Primitive.div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={clsx("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "Carousel.Item";

// ==================== Carousel.NavigationButton (내부용) ====================
// 훅은 export
const useCanScroll = (api: CarouselApi | null, direction: "prev" | "next") => {
  const [isCanScroll, setIsCanScroll] = useState(true);
  const isPrev = direction === "prev";
  const scroll = isPrev ? api?.scrollPrev : api?.scrollNext;
  const canScroll = isPrev ? api?.canScrollPrev : api?.canScrollNext;

  const onSelect = useCallback(() => {
    if (!canScroll) return;
    setIsCanScroll(!canScroll());
  }, [canScroll]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return { isCanScroll, scroll };
};

interface CarouselNavigationButtonProps extends CarouselModuleProps<"button"> {
  carouselApi?: CarouselApi | null;
  direction: "prev" | "next";
}

const CarouselNavigationButton = ({ carouselApi, direction, ...props }: CarouselNavigationButtonProps) => {
  const api = useCarouselApi(carouselApi);
  const { isCanScroll, scroll } = useCanScroll(api, direction);

  const handleClick = useCallback(() => {
    scroll?.();
  }, [scroll]);

  return (
    <Primitive.button
      disabled={isCanScroll}
      aria-disabled={isCanScroll}
      data-disabled={isCanScroll}
      onClick={handleClick}
      aria-label={direction}
      role="button"
      {...props}
    />
  );
};
// ==================== Carousel.PrevButton ====================
const CarouselPrevButton = memo((props: CarouselModuleProps<"button">) => {
  return <CarouselNavigationButton {...props} direction="prev" />;
});
CarouselPrevButton.displayName = "Carousel.PrevButton";

// ==================== Carousel.NextButton ====================
const CarouselNextButton = memo((props: CarouselModuleProps<"button">) => {
  return <CarouselNavigationButton {...props} direction="next" />;
});
CarouselNextButton.displayName = "Carousel.NextButton";

// ==================== Carousel.CurrentIndex ====================
const useCurrentIndex = (api: CarouselApi | null) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const updateCurrentIndex = useCallback((api: NonNullable<CarouselApi>) => {
    setCurrentIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    updateCurrentIndex(api);
    api.on("select", updateCurrentIndex);
    api.on("reInit", updateCurrentIndex);
    return () => {
      api.off("select", updateCurrentIndex);
      api.off("reInit", updateCurrentIndex);
    };
  }, [api, updateCurrentIndex]);

  return currentIndex;
};

const CarouselCurrentIndex = memo(({ carouselApi, ...props }: CarouselModuleProps<"span">) => {
  const api = useCarouselApi(carouselApi);
  const currentIndex = useCurrentIndex(api);
  return <Primitive.span data-slot="carousel-current-index" {...props} children={currentIndex + 1} />;
});
CarouselCurrentIndex.displayName = "Carousel.CurrentIndex";

// ==================== Carousel.TotalCount ====================
const useTotalCount = (api: CarouselApi | null) => {
  const [totalCount, setTotalCount] = useState(0);
  const updateTotalCount = useCallback((api: NonNullable<CarouselApi>) => {
    setTotalCount(api.scrollSnapList().length);
  }, []);
  useEffect(() => {
    if (!api) return;
    updateTotalCount(api);
    api.on("reInit", updateTotalCount);
    return () => {
      api.off("reInit", updateTotalCount);
    };
  }, [api, updateTotalCount]);
  return totalCount;
};
const CarouselTotalCount = memo(({ carouselApi, ...props }: CarouselModuleProps<"span">) => {
  const api = useCarouselApi(carouselApi);
  const totalCount = useTotalCount(api);
  return <Primitive.span data-slot="carousel-total-count" {...props} children={totalCount} />;
});
CarouselTotalCount.displayName = "Carousel.TotalCount";

// ==================== Carousel.IndicatorWrapper ====================
const CarouselIndicatorWrapper = memo(
  forwardRef<React.ElementRef<"div">, CarouselModuleProps<"div">>(({ carouselApi, ...props }, ref) => {
    const api = useCarouselApi(carouselApi);
    const { rootRef, handleKeyDown, setActiveIndex } = useArrowNavigation({
      selector: '[data-slot="carousel-indicator"]',
      clickOnNavigate: true,
    });
    const composedRef = useComposedRefs(ref, rootRef);

    const updateIndex = useCallback(
      (api: NonNullable<CarouselApi>) => {
        setActiveIndex(api.selectedScrollSnap());
      },
      [setActiveIndex],
    );

    useEffect(() => {
      if (!api) return;
      updateIndex(api);
      api.on("reInit", updateIndex);
      api.on("select", updateIndex);
      return () => {
        api.off("reInit", updateIndex);
        api.off("select", updateIndex);
      };
    }, [api]);

    return (
      <Primitive.div
        ref={composedRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        data-slot="carousel-indicator-wrapper"
        {...props}
      />
    );
  }),
);
CarouselIndicatorWrapper.displayName = "Carousel.IndicatorWrapper";

// ==================== Carousel.Indicator ====================
interface CarouselIndicatorProps extends Omit<CarouselModuleProps<"button">, "onClick"> {
  index: number;
  onClick?: (event: React.MouseEvent, api: CarouselApi) => void;
}
const CarouselIndicator = memo(({ carouselApi, index, onClick, ...props }: CarouselIndicatorProps) => {
  const api = useCarouselApi(carouselApi);
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      onClick?.(e, api);
      if (!api) return;
      api?.scrollTo(index);
    },
    [api, index, onClick],
  );

  const updateIsActive = useCallback(
    (api: NonNullable<CarouselApi>) => {
      setIsActive(api.selectedScrollSnap() === index);
    },
    [index],
  );

  useEffect(() => {
    if (!api) return;
    updateIsActive(api);
    api.on("reInit", updateIsActive);
    api.on("select", updateIsActive);
    return () => {
      api.off("reInit", updateIsActive);
      api.off("select", updateIsActive);
    };
  }, [api, index, updateIsActive]);
  return (
    <Primitive.button
      onClick={handleClick}
      role="button"
      data-slot="carousel-indicator"
      data-active={isActive}
      aria-label={`carousel-indicator-${index + 1}`}
      data-index={index}
      {...props}
    />
  );
});
CarouselIndicator.displayName = "Carousel.Indicator";

// =========== Plugin ===========
// =========== Plugin Autoplay ===========
const useAutoplay = (api: CarouselApi | null) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAutoplay = useCallback(() => {
    const autoplayApi = api?.plugins().autoplay;
    if (!autoplayApi) return;
    const playOrStop = isPlaying ? autoplayApi.stop : autoplayApi.play;
    playOrStop();
  }, [api, isPlaying]);

  // 사용자 상호작용(드래그, 클릭 등)이 발생했을 때 호출될 핸들러
  const handleResetOrStop = useCallback(() => {
    const autoplayApi = api?.plugins().autoplay;
    if (!autoplayApi) return;
    // stopOnInteraction 옵션값에 따라
    // false이면 리셋(계속 재생, 타이머 초기화), true이면 정지
    const resetOrStop = autoplayApi.options.stopOnInteraction === false ? autoplayApi.reset : autoplayApi.stop;

    resetOrStop();
  }, [api]);

  const startPlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);
  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, []);
  const updateIsPlaying = useCallback((api: NonNullable<CarouselApi>) => {
    setIsPlaying(api.plugins().autoplay.isPlaying());
  }, []);

  useEffect(() => {
    const autoplayApi = api?.plugins().autoplay;
    if (!autoplayApi) return;
    setIsPlaying(autoplayApi.isPlaying());
    api.on("autoplay:play", startPlaying);
    api.on("autoplay:stop", stopPlaying);
    api.on("reInit", updateIsPlaying);
    return () => {
      api.off("autoplay:play", startPlaying);
      api.off("autoplay:stop", stopPlaying);
      api.off("reInit", updateIsPlaying);
    };
  }, [api, startPlaying, stopPlaying, updateIsPlaying]);

  return { isPlaying, handleResetOrStop, toggleAutoplay };
};
// =========== Plugin AutoScroll===========
const useAutoScroll = (api: CarouselApi | null) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAutoplay = useCallback(() => {
    const autoScrollApi = api?.plugins()?.autoScroll;
    if (!autoScrollApi) return;
    const playOrStop = isPlaying ? autoScrollApi.stop : autoScrollApi.play;
    playOrStop();
  }, [api, isPlaying]);

  const handleResetOrStop = useCallback(() => {
    const autoScrollApi = api?.plugins()?.autoScroll;
    if (!autoScrollApi) return;
    const resetOrStop = autoScrollApi.options.stopOnInteraction === false ? autoScrollApi.reset : autoScrollApi.stop;

    resetOrStop();
  }, [api]);

  const startPlaying = useCallback(() => {
    setIsPlaying(true);
  }, []);
  const stopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, []);
  const updateIsPlaying = useCallback((api: NonNullable<CarouselApi>) => {
    setIsPlaying(api?.plugins()?.autoScroll.isPlaying());
  }, []);

  useEffect(() => {
    const autoScrollApi = api?.plugins()?.autoScroll;
    if (!autoScrollApi) return;
    setIsPlaying(autoScrollApi.isPlaying());
    api.on("autoScroll:play", startPlaying);
    api.on("autoScroll:stop", stopPlaying);
    api.on("reInit", updateIsPlaying);
    return () => {
      api.off("autoScroll:play", startPlaying);
      api.off("autoScroll:stop", stopPlaying);
      api.off("reInit", updateIsPlaying);
    };
  }, [api, startPlaying, stopPlaying, updateIsPlaying]);

  return { isPlaying, handleResetOrStop, toggleAutoplay };
};

// =========== Export Components ===========
export const Carousel = {
  Root: CarouselRoot,
  Container: CarouselContainer,
  Track: CarouselTrack,
  Item: CarouselItem,
  PrevButton: CarouselPrevButton,
  NextButton: CarouselNextButton,
  CurrentIndex: CarouselCurrentIndex,
  TotalCount: CarouselTotalCount,
  IndicatorWrapper: CarouselIndicatorWrapper,
  Indicator: CarouselIndicator,
};
// =========== Export Hooks ===========
export { useCanScroll, useCurrentIndex, useTotalCount };

// =========== Export Plugin Hooks ===========
export { useAutoplay, useAutoScroll };

// =========== Export Types ===========
export type { CarouselApi, CarouselOptions, CarouselPlugin, CarouselProps };
