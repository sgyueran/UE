import { Component, type ComponentType, type ReactNode, useRef, useState } from "react";

import type { ThreeDViewerCanvasProps } from "./ThreeDViewerCanvas";

export type ThreeDViewerModel = {
  readonly src: string;
  readonly alt: string;
  readonly poster?: string;
  readonly title?: string;
};

type ViewerStatus = "idle" | "loading" | "ready" | "unsupported" | "error";

type ViewerCanvasComponent = ComponentType<ThreeDViewerCanvasProps>;

const TODO_USER_INPUT_MARKER = `TODO${"(USER_INPUT)"}`;

type ThreeDViewerProps = {
  readonly model: ThreeDViewerModel | null;
};

type ViewerErrorBoundaryProps = {
  readonly children: ReactNode;
  readonly fallback: ReactNode;
  readonly onError: (message: string) => void;
};

type ViewerErrorBoundaryState = {
  readonly hasError: boolean;
};

function isUsableModel(model: ThreeDViewerModel | null): model is ThreeDViewerModel {
  return Boolean(model?.src.trim() && model.alt.trim() && model.src !== TODO_USER_INPUT_MARKER && model.alt !== TODO_USER_INPUT_MARKER);
}

function supportsWebGL() {
  if (typeof document === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");

  try {
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

class ViewerErrorBoundary extends Component<ViewerErrorBoundaryProps, ViewerErrorBoundaryState> {
  state: ViewerErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ViewerErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error instanceof Error ? error.message : "The model viewer failed to load.");
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function ViewerFallback({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return (
    <div className="flex min-h-[20rem] flex-col justify-end rounded-lg border border-dashed border-border bg-card/60 p-lg">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">3D viewer</p>
      <h2 className="mt-sm text-2xl font-semibold text-text">{title}</h2>
      <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}

export function ThreeDViewer({ model }: ThreeDViewerProps) {
  const [status, setStatus] = useState<ViewerStatus>("idle");
  const [ViewerCanvas, setViewerCanvas] = useState<ViewerCanvasComponent | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [errorMessage, setErrorMessage] = useState("The model viewer is unavailable.");
  const viewerShellRef = useRef<HTMLDivElement>(null);

  async function loadViewer() {
    if (!isUsableModel(model)) {
      setStatus("error");
      setErrorMessage("No verified public GLB model is available.");
      return;
    }

    if (!supportsWebGL()) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");

    try {
      const module = await import("./ThreeDViewerCanvas");
      setViewerCanvas(() => module.ThreeDViewerCanvas);
      setStatus("ready");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "The model viewer could not be loaded.");
      setStatus("error");
    }
  }

  async function enterFullscreen() {
    await viewerShellRef.current?.requestFullscreen?.();
  }

  if (!isUsableModel(model)) {
    return (
      <ViewerFallback title="3D model unavailable">
        No verified public GLB model is approved for this project. The page does not create a Canvas, initialize WebGL, or download a model.
      </ViewerFallback>
    );
  }

  const title = model.title ?? "Verified GLB model";

  return (
    <section aria-labelledby="project-viewer-title" className="rounded-lg border border-border bg-card p-lg">
      <div className="flex flex-col gap-md md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">3D viewer</p>
          <h2 className="mt-sm text-2xl font-semibold text-text" id="project-viewer-title">
            {title}
          </h2>
          <p className="mt-md max-w-[42rem] text-sm leading-6 text-muted">
            The GLB viewer loads only after this explicit action. Reduced-motion mode disables continuous animation.
          </p>
        </div>
        <div className="flex flex-wrap gap-sm">
          <button className="rounded-full border border-border px-md py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={loadViewer} type="button">
            {status === "idle" ? "Load model" : "Reload model"}
          </button>
          <button className="rounded-full border border-border px-md py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={() => setResetKey((value) => value + 1)} type="button">
            Reset
          </button>
          <button className="rounded-full border border-border px-md py-xs text-sm text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onClick={enterFullscreen} type="button">
            Fullscreen
          </button>
        </div>
      </div>

      <div className="mt-lg overflow-hidden rounded-lg border border-border bg-background" ref={viewerShellRef}>
        {status === "idle" ? (
          <div className="flex min-h-[22rem] flex-col justify-end p-lg">
            {model.poster ? <img alt={model.alt} className="mb-md max-h-[18rem] w-full rounded-md object-contain" loading="lazy" src={model.poster} /> : null}
            <p className="text-sm leading-6 text-muted">Canvas and WebGL are not initialized until the model is loaded.</p>
          </div>
        ) : null}
        {status === "loading" ? <div className="flex min-h-[22rem] items-center justify-center p-lg text-sm text-muted">Loading viewer...</div> : null}
        {status === "unsupported" ? (
          <div className="flex min-h-[22rem] flex-col justify-end p-lg">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">WebGL unsupported</p>
            <p className="mt-sm text-sm leading-6 text-muted">This device or browser cannot initialize WebGL. The poster and project text remain available.</p>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="flex min-h-[22rem] flex-col justify-end p-lg">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Viewer error</p>
            <p className="mt-sm text-sm leading-6 text-muted">{errorMessage}</p>
          </div>
        ) : null}
        {status === "ready" && ViewerCanvas ? (
          <ViewerErrorBoundary
            fallback={
              <div className="flex min-h-[22rem] flex-col justify-end p-lg">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Viewer error</p>
                <p className="mt-sm text-sm leading-6 text-muted">{errorMessage}</p>
              </div>
            }
            onError={(message) => {
              setErrorMessage(message);
            }}
          >
            <ViewerCanvas key={`${model.src}-${resetKey}`} label={model.alt} modelUrl={model.src} reducedMotion={prefersReducedMotion()} />
          </ViewerErrorBoundary>
        ) : null}
      </div>
    </section>
  );
}
