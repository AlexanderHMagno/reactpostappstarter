import { createStyles, Paper, Text, Title, Button, rem, Skeleton } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function ArticleCardImage({ title, category, image, id, individual }) {
  const { classes } = useStyles();
  return (
    <Paper
    withBorder
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
  
      {!individual && 
        <Link to={id.toString()}>
            <Button variant="white" color="dark">
              View
            </Button>
        </Link>
      }
    </Paper>
  );
}



export function CardSkeleton() {
  return (
    <Paper >
      <Skeleton height={rem(400)}  width={rem(300)}/> 
    </Paper>
  );
}