import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.1','localhost'],
  
};

export default withFlowbiteReact(nextConfig);