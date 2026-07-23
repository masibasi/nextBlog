import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Ji Min Lee";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full justify-between bg-[#fdf8f0] px-20 py-16">
        <div tw="flex w-3 h-16" style={{ background: "#990000" }} />
        <div tw="flex flex-col">
          <h2 tw="flex text-6xl font-bold tracking-tight text-left text-neutral-900 max-w-[900px] leading-tight">
            {title}
          </h2>
        </div>
        <div tw="flex items-center text-2xl text-neutral-500">jimin.blog</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
