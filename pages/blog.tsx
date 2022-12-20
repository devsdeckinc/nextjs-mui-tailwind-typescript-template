import * as React from "react";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
// import { getAllBlogPosts, BlogPost } from '../lib/sourcing';
import { alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import Section from '../src/layouts/Section';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Chip from "@mui/material/Chip";
import Head from "../src/modules/components/Head";
import AppHeader from "../src/layouts/AppHeader";
import AppFooter from "../src/layouts/AppFooter";
import GradientText from "../src/components/typography/GradientText";
import BrandingProvider from "../src/BrandingProvider";
import { authors as AUTHORS } from "../src/modules/components/TopLayoutBlog";
import HeroEnd from "../src/components/home/HeroEnd";
import Link from "../src/modules/components/Link";
import { BlogPost } from "./@types/blogs";

export const getStaticProps = () => {
  const data = {
    title: "Q2 2021 Update",
    description: "An update on our mission for Q2 2021.",
    date: "2021-07-12T00:00:00.000Z",
    authors: ["oliviertassinari", "mbrookes"],
    card: true,
    tags: ["Company"],
  };
  return {
    props: data,
  };
};

function PostPreview(props: BlogPost) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
        {props.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontWeight: 500,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[50]
                  : theme.palette.grey[700],
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.grey[700], 0.5)
                  : theme.palette.grey[100],
              "&:hover": {
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.grey[700], 0.5)
                    : theme.palette.grey[100],
              },
            }}
          />
        ))}
      </Box>
      <Typography
        component="h2"
        fontWeight="bold"
        variant="subtitle1"
        sx={{
          mb: 0.5,
        }}
      >
        <Link
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          sx={{
            color: "text.primary",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {props.title}
        </Link>
      </Typography>
      <Typography color="text.secondary" sx={{ mb: "auto" }}>
        {props.description}
      </Typography>
      {props.authors && (
        <AvatarGroup
          sx={{
            mt: 2,
            mb: 1,
            alignSelf: "flex-start",
            "& .MuiAvatar-circular": {
              width: 28,
              height: 28,
              border: 3,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[100],
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.primaryDark[100]
                  : theme.palette.grey[800],
              fontSize: (theme) => theme.typography.pxToRem(13),
              fontWeight: 500,
            },
          }}
        >
          {(props.authors as Array<keyof typeof AUTHORS>).map((author) => (
            <Avatar
              key={author}
              alt=""
              src={`${AUTHORS[author].avatar}?s=${28}`}
              srcSet={`${AUTHORS[author].avatar}?s=${28 * 2} 2x`}
            />
          ))}
        </AvatarGroup>
      )}
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {props.authors && (
            <Typography variant="body2" fontWeight="500">
              {props.authors
                .slice(0, 3)
                .map((userId) => {
                  const name = AUTHORS[userId as keyof typeof AUTHORS]?.name;
                  if (name) {
                    if (props.authors && props.authors.length > 1) {
                      // display only firstName
                      return name.split(" ")[0];
                    }
                    return name;
                  }
                  return userId;
                })
                .join(", ")}
              {props.authors.length > 2 && ", and more."}
            </Typography>
          )}
          {props.date && (
            <Typography
              variant="caption"
              fontWeight="400"
              color="text.secondary"
            >
              {new Date(props.date).toDateString()}
            </Typography>
          )}
        </Box>
        <Button
          component={Link}
          aria-describedby={`describe-${props.slug}`}
          href={`/blog/${props.slug}`}
          id={`describe-${props.slug}`}
          size="small"
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={(theme) => ({
            mt: { xs: 1, md: 0 },
            mb: { xs: -1, md: 0 },
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary[300]
                : theme.palette.primary[600],
            "& .MuiButton-endIcon": {
              ml: 0,
            },
          })}
        >
          Read more
        </Button>
      </Box>
    </React.Fragment>
  );
}

const PAGE_SIZE = 5;

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const postListRef = React.useRef<HTMLDivElement | null>(null);
  const [page, setPage] = React.useState(0);
  const [selectedTags, setSelectedTags] = React.useState<
    Record<string, boolean>
  >({});
  const allBlogPosts = [] as const;
  // const [firstPost, secondPost, ...otherPosts] = allBlogPosts;
  const tagInfo: Record<string, number | undefined> = {};
  allBlogPosts.forEach((post) => {
    /*post.tags.forEach((tag: any) => {
      if (tagInfo[tag]) {
        tagInfo[tag]! -= 1;
      }
    });*/
  });
  Object.entries(tagInfo).forEach(([tagName, tagCount]) => {
    if (tagCount === 0) {
      delete tagInfo[tagName];
    }
  });
  const filteredPosts = allBlogPosts.filter((post: any) => {
    if (Object.keys(selectedTags).length === 0) {
      return true;
    }

    return post.tags.some((tag: any) => {
      return Object.keys(selectedTags).includes(tag);
    });
  });
  const pageStart = page * PAGE_SIZE;
  const totalPage = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const displayedPosts = filteredPosts.slice(pageStart, pageStart + PAGE_SIZE);
  const getTags = React.useCallback(() => {
    const { tags = "" } = router.query;
    return (typeof tags === "string" ? tags.split(",") : tags || [])
      .map((str) => str.trim())
      .filter((tag) => !!tag);
  }, [router.query]);

  React.useEffect(() => {
    const arrayTags = getTags();
    const finalTags: Record<string, boolean> = {};
    arrayTags.forEach((tag) => {
      finalTags[tag] = true;
    });
    setSelectedTags(finalTags);
    setPage(0);
  }, [getTags]);

  const removeTag = (tag: string) => {
    router.push(
      {
        query: {
          ...router.query,
          tags: getTags().filter((value) => value !== tag),
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <BrandingProvider>
      <Head
        title="Blog - MUI"
        description="Follow the MUI blog to learn about new product features, latest advancements in UI development, and business initiatives."
        disableAlternateLocale
      />
      <AppHeader />
      <main id="main-content"></main>
      <HeroEnd />
      <Divider />
      <AppFooter />
    </BrandingProvider>
  );
}
