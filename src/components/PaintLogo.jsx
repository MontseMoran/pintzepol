import React, { useEffect, useRef } from 'react';

const FILLED_LOGO_SRC = 'image/logo-efect/logo-filled.svg';
const OUTLINE_LOGO_SRC = 'image/logo-efect/logo-outline.svg';
const PAINT_DARK = 0.78;
const BACKGROUND_LIGHT = 0.96;
const VIDEO_LAYER_ALPHA = 0.62;
const TRANSLUCENT_LAYER_ALPHA = 0.32;

const smoothstep = (edge0, edge1, value) => {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));

  return t * t * (3 - 2 * t);
};

const getObjectPositionValue = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  if (value.endsWith('%')) {
    return Number.parseFloat(value) / 100;
  }

  if (value === 'left' || value === 'top') {
    return 0;
  }

  if (value === 'right' || value === 'bottom') {
    return 1;
  }

  if (value === 'center') {
    return 0.5;
  }

  return fallback;
};

const loadImage = (src, fallbackSrc) => new Promise((resolve, reject) => {
  const image = new Image();

  image.onload = () => resolve({ image, loadedSrc: src });
  image.onerror = () => {
    if (!fallbackSrc || fallbackSrc === src) {
      reject(new Error(`Unable to load ${src}`));
      return;
    }

    const fallbackImage = new Image();
    fallbackImage.onload = () => resolve({ image: fallbackImage, loadedSrc: fallbackSrc });
    fallbackImage.onerror = reject;
    fallbackImage.src = fallbackSrc;
  };
  image.src = src;
});

const compositePixel = (output, index, red, green, blue, alpha) => {
  if (alpha <= 0) {
    return;
  }

  const destinationAlpha = output[index + 3] / 255;
  const sourceAlpha = alpha / 255;
  const finalAlpha = sourceAlpha + destinationAlpha * (1 - sourceAlpha);

  if (finalAlpha <= 0) {
    output[index] = 0;
    output[index + 1] = 0;
    output[index + 2] = 0;
    output[index + 3] = 0;
    return;
  }

  output[index] = ((red * sourceAlpha) + (output[index] * destinationAlpha * (1 - sourceAlpha))) / finalAlpha;
  output[index + 1] = ((green * sourceAlpha) + (output[index + 1] * destinationAlpha * (1 - sourceAlpha))) / finalAlpha;
  output[index + 2] = ((blue * sourceAlpha) + (output[index + 2] * destinationAlpha * (1 - sourceAlpha))) / finalAlpha;
  output[index + 3] = finalAlpha * 255;
};

function PaintLogo({ videoRef }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);
  const logoImagesRef = useRef(null);
  const logoLayerDataRef = useRef(null);
  const outputDataRef = useRef(null);
  const sampleContextRef = useRef(null);
  const geometryRef = useRef(null);
  const frameRequestRef = useRef(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const video = videoRef?.current;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!root || !canvas || !video || !isDesktop || prefersReducedMotion) {
      return undefined;
    }

    const context = canvas.getContext('2d', { willReadFrequently: true });
    const sampleCanvas = document.createElement('canvas');
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true });

    if (!context || !sampleContext) {
      return undefined;
    }

    sampleContextRef.current = sampleContext;
    isCancelledRef.current = false;

    const renderFallback = () => {
      if (fallbackRef.current) {
        fallbackRef.current.style.display = 'block';
      }
    };

    const calculateGeometry = () => {
      if (!video.videoWidth || !video.videoHeight) {
        geometryRef.current = null;
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const videoRect = video.getBoundingClientRect();
      const logoRect = root.getBoundingClientRect();
      const canvasWidth = Math.max(1, Math.round(logoRect.width * dpr));
      const canvasHeight = Math.max(1, Math.round(logoRect.height * dpr));

      if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        sampleCanvas.width = canvasWidth;
        sampleCanvas.height = canvasHeight;
        logoLayerDataRef.current = null;
        outputDataRef.current = null;
      }

      const computedStyle = window.getComputedStyle(video);
      const objectPosition = computedStyle.objectPosition.split(' ');
      const positionX = getObjectPositionValue(objectPosition[0], 0.5);
      const positionY = getObjectPositionValue(objectPosition[1], 0.5);
      const scale = computedStyle.objectFit === 'contain'
        ? Math.min(videoRect.width / video.videoWidth, videoRect.height / video.videoHeight)
        : Math.max(videoRect.width / video.videoWidth, videoRect.height / video.videoHeight);
      const renderedWidth = video.videoWidth * scale;
      const renderedHeight = video.videoHeight * scale;
      const cropX = (renderedWidth - videoRect.width) * positionX;
      const cropY = (renderedHeight - videoRect.height) * positionY;
      const localX = logoRect.left - videoRect.left;
      const localY = logoRect.top - videoRect.top;

      geometryRef.current = {
        canvasWidth,
        canvasHeight,
        sourceX: (localX + cropX) / scale,
        sourceY: (localY + cropY) / scale,
        sourceWidth: logoRect.width / scale,
        sourceHeight: logoRect.height / scale,
      };
    };

    const readLogoLayer = (image, geometry) => {
      context.clearRect(0, 0, geometry.canvasWidth, geometry.canvasHeight);
      context.drawImage(image, 0, 0, geometry.canvasWidth, geometry.canvasHeight);

      return context.getImageData(0, 0, geometry.canvasWidth, geometry.canvasHeight);
    };

    const prerenderLogoLayers = () => {
      const geometry = geometryRef.current;
      const logoImages = logoImagesRef.current;

      if (!geometry || logoLayerDataRef.current) {
        return Boolean(logoLayerDataRef.current);
      }

      if (!logoImages) {
        return false;
      }

      logoLayerDataRef.current = {
        filled: readLogoLayer(logoImages.filled, geometry),
        translucent: readLogoLayer(logoImages.translucent, geometry),
        outline: readLogoLayer(logoImages.outline, geometry),
      };
      outputDataRef.current = context.createImageData(geometry.canvasWidth, geometry.canvasHeight);

      return true;
    };

    const drawFrame = () => {
      const geometry = geometryRef.current;

      if (!geometry || !prerenderLogoLayers()) {
        renderFallback();
        return;
      }

      try {
        sampleContext.drawImage(
          video,
          geometry.sourceX,
          geometry.sourceY,
          geometry.sourceWidth,
          geometry.sourceHeight,
          0,
          0,
          geometry.canvasWidth,
          geometry.canvasHeight,
        );

        const videoPixels = sampleContext.getImageData(0, 0, geometry.canvasWidth, geometry.canvasHeight);
        const logoLayers = logoLayerDataRef.current;
        const output = outputDataRef.current;

        for (let index = 0; index < logoLayers.filled.data.length; index += 4) {
          const luminance = (
            (0.2126 * videoPixels.data[index])
            + (0.7152 * videoPixels.data[index + 1])
            + (0.0722 * videoPixels.data[index + 2])
          ) / 255;
          const paintAmount = 1 - smoothstep(PAINT_DARK, BACKGROUND_LIGHT, luminance);
          const logoAlpha = logoLayers.filled.data[index + 3] / 255;
          const videoAlpha = 255 * logoAlpha * paintAmount * VIDEO_LAYER_ALPHA;
          const translucentAlpha = logoLayers.translucent.data[index + 3] * paintAmount * TRANSLUCENT_LAYER_ALPHA;

          output.data[index] = logoLayers.filled.data[index];
          output.data[index + 1] = logoLayers.filled.data[index + 1];
          output.data[index + 2] = logoLayers.filled.data[index + 2];
          output.data[index + 3] = logoLayers.filled.data[index + 3];

          compositePixel(
            output.data,
            index,
            videoPixels.data[index],
            videoPixels.data[index + 1],
            videoPixels.data[index + 2],
            videoAlpha,
          );
          compositePixel(
            output.data,
            index,
            logoLayers.translucent.data[index],
            logoLayers.translucent.data[index + 1],
            logoLayers.translucent.data[index + 2],
            translucentAlpha,
          );
          compositePixel(
            output.data,
            index,
            logoLayers.outline.data[index],
            logoLayers.outline.data[index + 1],
            logoLayers.outline.data[index + 2],
            logoLayers.outline.data[index + 3],
          );
        }

        context.putImageData(output, 0, 0);

        if (fallbackRef.current) {
          fallbackRef.current.style.display = 'none';
        }
      } catch {
        renderFallback();
      }
    };

    const requestNextFrame = () => {
      if (isCancelledRef.current) {
        return;
      }

      drawFrame();

      if ('requestVideoFrameCallback' in video) {
        frameRequestRef.current = video.requestVideoFrameCallback(requestNextFrame);
        return;
      }

      frameRequestRef.current = window.requestAnimationFrame(requestNextFrame);
    };

    const handleGeometryChange = () => {
      calculateGeometry();
      drawFrame();
    };

    Promise.all([
      loadImage(FILLED_LOGO_SRC),
      loadImage(OUTLINE_LOGO_SRC),
      loadImage(FILLED_LOGO_SRC),
    ]).then(([filled, outline, translucent]) => {
      if (isCancelledRef.current) {
        return;
      }

      logoImagesRef.current = {
        filled: filled.image,
        outline: outline.image,
        translucent: translucent.image,
      };
      calculateGeometry();
      requestNextFrame();
    }).catch(renderFallback);

    const resizeObserver = new ResizeObserver(handleGeometryChange);
    resizeObserver.observe(root);
    resizeObserver.observe(video);
    window.addEventListener('resize', handleGeometryChange);
    video.addEventListener('loadedmetadata', handleGeometryChange);

    return () => {
      isCancelledRef.current = true;
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleGeometryChange);
      video.removeEventListener('loadedmetadata', handleGeometryChange);

      if ('cancelVideoFrameCallback' in video && frameRequestRef.current) {
        video.cancelVideoFrameCallback(frameRequestRef.current);
      } else if (frameRequestRef.current) {
        window.cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [videoRef]);

  return (
    <span ref={rootRef} className="paint-logo hero__logo" aria-label="Logo Pintzepol">
      <img
        ref={fallbackRef}
        src={FILLED_LOGO_SRC}
        alt=""
        className="paint-logo__fallback"
      />
      <canvas
        ref={canvasRef}
        className="paint-logo__canvas"
        aria-hidden="true"
      />
    </span>
  );
}

export default PaintLogo;
