import { NextRequest, NextResponse } from "next/server/";

const POST = async (NextRequest) => {
  const { content } = await req.json();

  console.log(content);

  return NextResponse.json({}, { status: 200 });
};

export { POST };
