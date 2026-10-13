import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];

if (isGitHubPages && (!repositoryOwner || !repositoryName)) {
  throw new Error("GITHUB_REPOSITORY must be set to owner/repository when building for GitHub Pages.");
}

const isUserOrOrganizationSite =
  repositoryOwner &&
  repositoryName?.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages && repositoryName && !isUserOrOrganizationSite
    ? { basePath: `/${repositoryName}` }
    : {}),
};

export default nextConfig;
