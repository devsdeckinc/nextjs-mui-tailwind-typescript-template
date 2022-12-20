import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// import SvgMuiLogo from '../icons/SvgMuiLogo';
import HeaderNavDropdown from '../components/header/HeaderNavDropdown';
import ThemeModeToggle from '../components/header/ThemeModeToggle';
import { useChangeTheme } from '../modules/components/ThemeContext';
import Link from '../modules/components/Link';
import { DeferredAppSearch } from '../modules/components/AppFrame';
import ROUTES from '../route';
import { useTranslate } from '../modules/utils/i18n';
import HeaderNavBar from '../components/header/HeaderNavBar';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    backdropFilter: 'blur(20px)',
    boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.grey[100]}`,
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  theme.applyDarkStyles({
    boxShadow: `inset 0px -1px 1px ${(theme.vars || theme).palette.primaryDark[700]}`,
    backgroundColor: alpha(theme.palette.primaryDark[900], 0.72),
  }),
]);

const HEIGHT = 56;

export default function AppHeader() {
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState<string | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const t = useTranslate();

  React.useEffect(() => {
    let initialMode = 'system';
    try {
      initialMode = localStorage.getItem('mui-mode') || initialMode;
    } catch (error) {
      // do nothing
    }
    setMode(initialMode);
  }, []);

  const handleChangeThemeMode = (checked: boolean) => {
    const paletteMode = checked ? 'dark' : 'light';
    setMode(paletteMode);

    localStorage.setItem('mui-mode', paletteMode); // syncing with homepage, can be removed once all pages are migrated to CSS variables
    changeTheme({ paletteMode });
  };

  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container sx={{ display: 'flex', alignItems: 'center', minHeight: HEIGHT }}>
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2 }}
        >
          {/*<SvgMuiLogo width={30} />*/}
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Stack direction="row" spacing={1}>
          <DeferredAppSearch />
          {mode !== null ? (
            <ThemeModeToggle
              checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
              onChange={handleChangeThemeMode}
            />
          ) : null}
        </Stack>
      </Container>
    </Header>
  );
}
