import React from "react";
import BlogCard from "../blog-card/BlogCard";
// import { getAllPosts } from "@/utils/markdown";
import { Container, Grid } from "@mui/material";

const BlogList = () => {
  // const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug", "author", "authorImage", "views", "comments", "category"]);
  const posts: any = [];
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 8,
      }}
    >
      <Grid container spacing={3}>
        {posts.map((blog: any, i: number) => (
          <Grid size={{ xs: 12, lg: 4, md: 4, sm: 6 }} display="flex" alignItems="stretch" key={i}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList;
