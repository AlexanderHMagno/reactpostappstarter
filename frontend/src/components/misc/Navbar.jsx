import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import {SwitchToggle} from "./ToogleMode";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
} from '@mantine/core';


const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));



function Navbar() {

    const { logoutService, user } = useBoundStore((state) => state);
    const onLogout = () => {
      logoutService();
    };

    
    const links = [
      {
        label: "Home",
        link: "/",
        visible: true,
      },
      {
        label: "Posts",
        link: "/posts",
        visible: !!user,
      },
      {
        label: "Create",
        link: "/posts/create",
        visible: !!user,
      },
      {
        label: "Login",
        link: "/login",
        visible: !user,
      },
      {
        label: "Logout",
        link: "/",
        action: onLogout,
        visible: !!user,
      }
    ];


  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].label);


  const { classes, cx } = useStyles();
 
  const handleClick = (label, action) => {
    setActive(label);
    if(action) action();
  } 

  useEffect(() => {
    if(active === "Login") {
        setActive("Posts");
    } else if( active === "Logout") {
        setActive("Home");
    }
  }, [user]);

  const items = links.map((link, idx) => 
    {return link.visible && (<NavLink key={idx} to={link.link} onClick={() => handleClick(link.label,link.action)} >
        <span 
            className={cx(classes.link, { [classes.linkActive]: active === link.label })}
            
        >{link.label}</span>
    </NavLink>)  
    } 
  );

  return (
    <Header height={HEADER_HEIGHT} mb={150} className={classes.root}>
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={5} className={classes.links}>
          {items}
          <SwitchToggle/>
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <SwitchToggle/>
            </Paper>
          )}
          
        </Transition>
        
      </Container>
      
    </Header>
  );
}

export default Navbar;