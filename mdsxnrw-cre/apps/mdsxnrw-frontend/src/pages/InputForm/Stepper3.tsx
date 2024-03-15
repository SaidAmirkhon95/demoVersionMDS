import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import FilterOpenSource from 'components/FilterOpenSource';
import FilterServiceLevel from 'components/FilterServiceLevel';
import FilterDeployementTyp from 'components/FilterDeployementTyp';
import ReactPaginate from 'react-paginate';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled, Drawer, Divider, Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';
import { useMyContext } from '../../MyContext';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useData } from '../../DataContext';
import LinearProgress from '@mui/material/LinearProgress';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { TextField, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSortedData } from 'SortedDataProvider';

const theme = createTheme({
  palette: {
    primary: {
      light: '#005B7F',
      main: '#11998E',
      dark: '#005946',
      contrastText: '#fff',
    },
  },
});

const myComponent = {
  height: '1000px',
  overflow: 'scroll',
};

//from here MoreInfoTable
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
//bis hier

//Tabs function
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//bis hier
export default function Stepper3() {
  const { isDeutsch } = useLanguage();
  const { responseData } = useData();
  const { connectors, recommendationScores } = responseData || {};
  const Connectors = connectors || [];

  const serviceLevel = [
    {
      value: 0,
      label: isDeutsch ? 'alle' : 'all',
    },
    {
      value: 33,
      label: 'Caas',
    },
    {
      value: 67,
      label: 'Paas',
    },
    {
      value: 100,
      label: 'Self service',
    },
  ];

  const itKnowhow = [
    {
      value: 0,
      label: isDeutsch ? 'alle' : 'all',
    },
    {
      value: 33,
      label: isDeutsch ? 'niedrig' : 'low',
    },
    {
      value: 67,
      label: isDeutsch ? 'mittel' : 'medium',
    },
    {
      value: 100,
      label: isDeutsch ? 'hoch' : 'high',
    },
  ];

  const basedOnODRL = [
    {
      value: 0,
      label: isDeutsch ? 'alle' : 'all',
    },
    {
      value: 50,
      label: isDeutsch ? 'ODRL basiert' : 'ODRL based',
    },
    {
      value: 100,
      label: isDeutsch ? 'Andere' : 'Other',
    },
  ];

  const gui = [
    {
      value: 0,
      label: isDeutsch ? 'alle' : 'all',
    },
    {
      value: 50,
      label: isDeutsch ? 'Ja' : 'Yes',
    },
    {
      value: 100,
      label: isDeutsch ? 'Nein' : 'No',
    },
  ];

  const fte = [
    {
      value: 0,
      label: isDeutsch ? 'alle' : 'all',
    },
    {
      value: 25,
      label: 'Person',
    },
    {
      value: 50,
      label: 'Team',
    },
    {
      value: 75,
      label: isDeutsch ? 'Großes Team' : 'Big team',
    },
    {
      value: 100,
      label: 'Depart- ment',
    },
  ];

  const sortOptions = [
    {
      value: 0,
      label: 'score',
    },
    {
      value: 33,
      label: 'price',
    },
    {
      value: 66,
      label: 'fte',
    },
    {
      value: 100,
      label: 'duration',
    },
  ];

  const StyledSlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-thumb': {
      width: 16,
      height: 16,
      marginTop: 0,
      marginLeft: 7,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSlider-valueLabel': {
      display: 'none',
    },
    '& .MuiSlider-markLabel': {
      fontSize: '0.8rem',
      whiteSpace: 'normal',
      textAlign: 'center',
      lineHeight: 1.2,
      wordWrap: 'break-word',
      marginLeft: '5px',
    },
    '& .MuiSlider-mark': {
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[400],
    },
    '& .MuiSlider-markActive': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

  const [serviceLevelFilter, setServiceLevelFilter] = useState<string>('all');
  const [itKnowhowFilter, setItKnowhowFilter] = useState<string>('all');
  const [odrlFilter, setOdrlFilter] = useState<boolean | null>(null);
  const [guiFilter, setGuiFilter] = useState<boolean | null>(null);
  const [fteFilter, setFteFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState({ from: '', to: '' });
  const [durationFilter, setDurationFilter] = useState({
    durationUnitFrom: '',
    durationUnitTo: '',
    durationFrom: '',
    durationTo: '',
  });
  const [sortScoreAsc, setSortScoreAsc] = useState(true);
  const [sortPriceAsc, setSortPriceAsc] = useState(true);
  const { sortedData, updateSortedData } = useSortedData();
  const [sortAttribute, setSortAttribute] = useState<{ value: number; label: string }>({
    value: 0,
    label: 'score',
  });
  const [sortAsc, setSortAsc] = useState(true);
  const [sortFteAsc, setSortFteAsc] = useState(true);
  const [sortDurationAsc, setSortDurationAsc] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [sortDirection] = useState('');

  /* const handleServiceLevelChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = serviceLevel.find((level) => level.value === newValue)?.label || '';
    setServiceLevelFilter(selectedValue);
  }; */

  const handleServiceLevelChange = (event: Event, newValue: number | number[]) => {
    const selectedValue =
      newValue === 33
        ? 'caas'
        : newValue === 67
        ? 'paas'
        : newValue === 100
        ? 'self_service'
        : 'all';
    setServiceLevelFilter(selectedValue);
  };

  const handleItKnowhowChange = (event: Event, newValue: number | number[]) => {
    const selectedValue =
      newValue === 33 ? 'low' : newValue === 67 ? 'medium' : newValue === 100 ? 'high' : 'all';
    setItKnowhowFilter(selectedValue);
  };

  const handleOdrlChange = (event: Event, newODRL: number | number[]) => {
    const selectedODRL = newODRL === 50 ? true : newODRL === 100 ? false : null;
    setOdrlFilter(selectedODRL);
  };

  const handleGuiChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = newValue === 50 ? true : newValue === 100 ? false : null;
    setGuiFilter(selectedValue);
  };

  const handleFteChange = (event: Event, newValue: number | number[]) => {
    const selectedValue =
      newValue === 25
        ? 'single_person'
        : newValue === 50
        ? 'small_team'
        : newValue === 75
        ? 'large_team'
        : newValue === 100
        ? 'department'
        : 'all';
    setFteFilter(selectedValue);
  };

  /* const handleFteChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = fte.find((level) => level.value === newValue)?.label || '';
    setFteFilter(selectedValue);
  }; */

  const handlePriceChange = (prop: any) => (event: any) => {
    setPriceFilter({ ...priceFilter, [prop]: event.target.value });
  };

  /* const handleDurationChange =
    (prop: keyof typeof durationFilter) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const value = (event.target as HTMLInputElement).value;
      const parsedValue = prop === 'durationUnit' ? value.toString() : parseInt(value) || '';

      if (parsedValue === 'none' || parsedValue === '0') {
        const { [prop]: removedFilter, ...restFilters } = durationFilter;
        setDurationFilter({
          ...(restFilters as { durationUnit: string; durationFrom: string; durationTo: string }),
        });
      } else {
        setDurationFilter({
          ...durationFilter,
          [prop]: parsedValue,
        });
      }
    }; */

  const handleDurationChange =
    (prop: keyof typeof durationFilter) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const value = (event.target as HTMLInputElement).value;
      const parsedValue =
        prop === 'durationUnitFrom' || prop === 'durationUnitTo'
          ? value.toString()
          : parseInt(value) || '';

      if (parsedValue === 'none' || parsedValue === '0') {
        const { [prop]: removedFilter, ...restFilters } = durationFilter;
        setDurationFilter({
          ...(restFilters as {
            durationUnitFrom: string;
            durationUnitTo: string;
            durationFrom: string;
            durationTo: string;
          }),
        });
      } else {
        setDurationFilter({
          ...durationFilter,
          [prop]: parsedValue,
        });
      }
    };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    const zippedData = Connectors.map((item: any, index: number) => ({
      ...item,
      recommendationScore: recommendationScores[index],
    }));

    const filteredData = zippedData.filter((item: any) => {
      if (
        (serviceLevelFilter === 'all' || item.serviceLevel.includes(serviceLevelFilter)) &&
        (itKnowhowFilter === 'all' || item.itKnowhow === itKnowhowFilter) &&
        (odrlFilter === null || item.basedOnODRL === odrlFilter) &&
        (guiFilter === null || item.gui === guiFilter) &&
        (fteFilter === 'all' || item.fte.includes(fteFilter)) &&
        (priceFilter.from === '' || item.price >= Number(priceFilter.from)) &&
        (priceFilter.to === '' || item.price <= Number(priceFilter.to)) &&
        /* (durationFilter.durationUnit === '' || item.durationUnit === durationFilter.durationUnit) &&
        (durationFilter.durationFrom === '' ||
          item.durationFrom >= Number(durationFilter.durationFrom)) &&
        (durationFilter.durationTo === '' || item.durationTo <= Number(durationFilter.durationTo)) */
        ((durationFilter.durationUnitFrom === '' &&
          durationFilter.durationFrom === '' &&
          durationFilter.durationUnitTo === '' &&
          durationFilter.durationTo === '') ||
          (durationFilter.durationUnitFrom === 'days' &&
            durationFilter.durationUnitTo === 'days' &&
            item.durationUnit === 'days' &&
            item.durationFrom >= Number(durationFilter.durationFrom) &&
            item.durationTo <= Number(durationFilter.durationTo)) ||
          (durationFilter.durationUnitFrom === 'months' &&
            durationFilter.durationUnitTo === 'months' &&
            item.durationUnit === 'months' &&
            item.durationFrom >= Number(durationFilter.durationFrom) &&
            item.durationTo <= Number(durationFilter.durationTo)) ||
          (durationFilter.durationUnitFrom === 'days' &&
            durationFilter.durationUnitTo === 'months' &&
            ((item.durationUnit === 'days' &&
              item.durationFrom >= Number(durationFilter.durationFrom) &&
              item.durationTo <= Math.ceil(Number(durationFilter.durationTo) * 30)) || // Convert months to days
              (item.durationUnit === 'months' &&
                item.durationFrom >= Number(durationFilter.durationFrom) / 30 &&
                item.durationTo <= Number(durationFilter.durationTo)))) ||
          (durationFilter.durationUnitFrom === 'months' &&
            durationFilter.durationUnitTo === 'days' &&
            ((item.durationUnit === 'months' &&
              item.durationFrom >= Number(durationFilter.durationFrom) &&
              item.durationTo <= Math.ceil(Number(durationFilter.durationTo) / 30)) || // Convert days to months
              (item.durationUnit === 'days' &&
                item.durationFrom >= Number(durationFilter.durationFrom) * 30 &&
                item.durationTo <= Number(durationFilter.durationTo)))) ||
          (durationFilter.durationUnitFrom === 'months' &&
            durationFilter.durationUnitTo === 'months' &&
            item.durationUnit === 'months' &&
            item.durationTo === Number(durationFilter.durationTo)))
      ) {
        return true;
      }
      return false;
    });

    let sorted = [...filteredData];

    /* if (sortScoreAsc) {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    } else {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }

    if (!sortScoreAsc) {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }

    if (!sortPriceAsc) {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }

    interface FteOrder {
      [key: string]: number;
    }

    const fteOrder: FteOrder = {
      single_person: 1,
      small_team: 2,
      large_team: 3,
      department: 4,
    };

    if (!sortFteAsc) {
      sorted = sorted.sort((a, b) => {
        return fteOrder[a.fte] - fteOrder[b.fte];
      });
    }

    if (!sortDurationAsc) {
      sorted = sorted.sort((a, b) => {
        // Assuming duration is represented as days and months
        if (a.durationUnit === 'days' && b.durationUnit === 'months') {
          return -1;
        } else if (a.durationUnit === 'months' && b.durationUnit === 'days') {
          return 1;
        } else {
          return a.durationFrom - b.durationFrom;
        }
      });
    } */

    switch (sortOption) {
      case 'score_high':
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection
            ? a.recommendationScore - b.recommendationScore
            : b.recommendationScore - a.recommendationScore,
        );
        break;
      case 'score_low':
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection
            ? b.recommendationScore - a.recommendationScore
            : a.recommendationScore - b.recommendationScore,
        );
        break;
      case 'fte_low':
        const fteOrderLow: { [key: string]: number } = {
          single_person: 1,
          small_team: 2,
          large_team: 3,
          department: 4,
        };
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection
            ? fteOrderLow[b.fte] - fteOrderLow[a.fte]
            : fteOrderLow[a.fte] - fteOrderLow[b.fte],
        );
        break;
      case 'fte_high':
        const fteOrderHigh: { [key: string]: number } = {
          department: 1,
          large_team: 2,
          small_team: 3,
          single_person: 4,
        };
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection
            ? fteOrderHigh[b.fte] - fteOrderHigh[a.fte]
            : fteOrderHigh[a.fte] - fteOrderHigh[b.fte],
        );
        break;
      case 'price_high':
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection ? a.price - b.price : b.price - a.price,
        );
        break;
      case 'price_low':
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection ? b.price - a.price : a.price - b.price,
        );
        break;
      case 'duration_high':
        sorted = sorted.sort((a: any, b: any) => {
          if (a.durationUnit === 'days' && b.durationUnit === 'months') {
            return sortDirection ? -1 : 1;
          } else if (a.durationUnit === 'months' && b.durationUnit === 'days') {
            return sortDirection ? 1 : -1;
          } else if (a.durationFrom === b.durationFrom) {
            return sortDirection ? a.durationTo - b.durationTo : b.durationTo - a.durationTo;
          } else {
            return sortDirection
              ? a.durationFrom - b.durationFrom
              : b.durationFrom - a.durationFrom;
          }
        });
        break;
      case 'duration_low':
        sorted = sorted.sort((a: any, b: any) => {
          if (a.durationUnit === 'days' && b.durationUnit === 'months') {
            return sortDirection ? 1 : -1;
          } else if (a.durationUnit === 'months' && b.durationUnit === 'days') {
            return sortDirection ? -1 : 1;
          } else if (a.durationFrom === b.durationFrom) {
            return sortDirection ? b.durationTo - a.durationTo : a.durationTo - b.durationTo;
          } else {
            return sortDirection
              ? b.durationFrom - a.durationFrom
              : a.durationFrom - b.durationFrom;
          }
        });
        break;
      default:
        sorted = sorted.sort((a: any, b: any) =>
          sortDirection
            ? a.recommendationScore - b.recommendationScore
            : b.recommendationScore - a.recommendationScore,
        );
    }

    updateSortedData(sorted);
  }, [
    Connectors,
    recommendationScores,
    sortOption,
    sortDirection,
    sortScoreAsc,
    sortPriceAsc,
    sortFteAsc,
    sortDurationAsc,
    serviceLevelFilter,
    itKnowhowFilter,
    odrlFilter,
    guiFilter,
    fteFilter,
    priceFilter,
    durationFilter,
  ]);

  const [pagination, setPagination] = useState({
    data: sortedData,
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    if (sortedData.length > 0) {
      setPagination((prevState: any) => ({
        ...prevState,
        pageCount: Math.ceil(sortedData.length / prevState.numberPerPage),
        data: sortedData,
        currentData: sortedData.slice(prevState.offset, prevState.offset + prevState.numberPerPage),
      }));
    }
  }, [sortedData, pagination.numberPerPage, pagination.offset]);

  useEffect(() => {
    // Scroll to the top of the page when pagination offset changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagination.offset]);

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 250;
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  //Popup and Table
  const [selectedConnectorIndex, setSelectedConnectorIndex] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(new Array(Connectors.length).fill(false));

  //Tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //Mobile and Tablet Views
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isTablet, setIsTablet] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* const { aufwandThree } = useMyContext(); */
  //Filter
  const {
    aufwandOne,
    aufwandTwo,
    aufwandThree,
    aufwandFour,
    aufwandFive,
    aufwandSix,
    aufwandSeven,
    companyName,
    industrySector,
    companyType,
    companyLocation,
    companyZipcode,
    selectedCountry,
    contactFirstname,
    contactLastname,
    contactEmail,
    companyItExpertsFrom,
    companyItExpertsTo,
  } = useMyContext();

  /* const serviceLevel = [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 33,
      label: 'caas',
    },
    {
      value: 67,
      label: 'paas',
    },
    {
      value: 100,
      label: 'self_service',
    },
  ];

  const itKnowhow = [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 33,
      label: 'low',
    },
    {
      value: 67,
      label: 'medium',
    },
    {
      value: 100,
      label: 'high',
    },
  ];

  const gui = [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 50,
      label: 'Yes',
    },
    {
      value: 100,
      label: 'No',
    },
  ];

  const fte = [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 25,
      label: 'single_person',
    },
    {
      value: 50,
      label: 'small_team',
    },
    {
      value: 75,
      label: 'large_team',
    },
    {
      value: 100,
      label: 'department',
    },
  ];

  const sortOptions = [
    {
      value: 0,
      label: 'score',
    },
    {
      value: 33,
      label: 'price',
    },
    {
      value: 66,
      label: 'fte',
    },
    {
      value: 100,
      label: 'duration',
    },
  ];

  const StyledSlider = styled(Slider)(({ theme }) => ({
    '& .MuiSlider-thumb': {
      width: 16,
      height: 16,
      marginTop: 0,
      marginLeft: 7,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiSlider-valueLabel': {
      display: 'none',
    },
    '& .MuiSlider-markLabel': {
      fontSize: '0.8rem',
      whiteSpace: 'normal',
      textAlign: 'center',
      lineHeight: 1.2,
      wordWrap: 'break-word',
      marginLeft: '5px',
    },
    '& .MuiSlider-mark': {
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[400],
    },
    '& .MuiSlider-markActive': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

  const [serviceLevelFilter, setServiceLevelFilter] = useState<string>('all');
  const [itKnowhowFilter, setItKnowhowFilter] = useState<string>('all');
  const [guiFilter, setGuiFilter] = useState<boolean | null>(null);
  const [fteFilter, setFteFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState({ from: '', to: '' });
  const [durationFilter, setDurationFilter] = useState({
    durationUnit: '',
    durationFrom: '',
    durationTo: '',
  }); */
  /* const [filteredData, setFilteredData] = useState<any[]>([]); */
  /* const [sortScoreAsc, setSortScoreAsc] = useState(true); // State to track score sorting order
  const [sortPriceAsc, setSortPriceAsc] = useState(true); // State to track price sorting order
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortAttribute, setSortAttribute] = useState<{ value: number; label: string }>({
    value: 0,
    label: 'score',
  });
  const [sortAsc, setSortAsc] = useState(true); // State to track sorting order

  const handleServiceLevelChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = serviceLevel.find((level) => level.value === newValue)?.label || '';
    setServiceLevelFilter(selectedValue);
  };

  const handleItKnowhowChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = itKnowhow.find((level) => level.value === newValue)?.label || '';
    setItKnowhowFilter(selectedValue);
  };

  const handleGuiChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = newValue === 50 ? true : newValue === 100 ? false : null;
    setGuiFilter(selectedValue);
  };

  const handleFteChange = (event: Event, newValue: number | number[]) => {
    const selectedValue = fte.find((level) => level.value === newValue)?.label || '';
    setFteFilter(selectedValue);
  };

  const handlePriceChange = (prop: any) => (event: any) => {
    setPriceFilter({ ...priceFilter, [prop]: event.target.value });
  };

  const handleDurationChange =
    (prop: keyof typeof durationFilter) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      const value = (event.target as HTMLInputElement).value;
      const parsedValue = prop === 'durationUnit' ? value.toString() : parseInt(value) || '';

      if (parsedValue === 'none' || parsedValue === '0') {
        const { [prop]: removedFilter, ...restFilters } = durationFilter;
        setDurationFilter({
          ...(restFilters as { durationUnit: string; durationFrom: string; durationTo: string }),
        });
      } else {
        setDurationFilter({
          ...durationFilter,
          [prop]: parsedValue,
        });
      }
    }; */

  /* const filteredData = pagination.currentData.filter((item: any) => {
    if (
      (serviceLevelFilter === 'all' || item.serviceLevel.includes(serviceLevelFilter)) &&
      (itKnowhowFilter === 'all' || item.itKnowhow === itKnowhowFilter) &&
      (guiFilter === null || item.gui === guiFilter) &&
      (fteFilter === 'all' || item.fte.includes(fteFilter)) &&
      (priceFilter.from === '' || item.price >= Number(priceFilter.from)) &&
      (priceFilter.to === '' || item.price <= Number(priceFilter.to)) &&
      (durationFilter.durationUnit === '' || item.durationUnit === durationFilter.durationUnit) &&
      (durationFilter.durationFrom === '' ||
        item.durationFrom >= Number(durationFilter.durationFrom)) &&
      (durationFilter.durationTo === '' || item.durationTo <= Number(durationFilter.durationTo))
    ) {
      return true;
    }
    return false;
  }); */

  /* useEffect(() => {
    const zippedData = pagination.currentData.map((item: any, index: number) => ({
      ...item,
      recommendationScore: recommendationScores[index + pagination.offset],
    }));

    const filteredData = zippedData.filter((item: any) => {
      if (
        (serviceLevelFilter === 'all' || item.serviceLevel.includes(serviceLevelFilter)) &&
        (itKnowhowFilter === 'all' || item.itKnowhow === itKnowhowFilter) &&
        (guiFilter === null || item.gui === guiFilter) &&
        (fteFilter === 'all' || item.fte.includes(fteFilter)) &&
        (priceFilter.from === '' || item.price >= Number(priceFilter.from)) &&
        (priceFilter.to === '' || item.price <= Number(priceFilter.to)) &&
        (durationFilter.durationUnit === '' || item.durationUnit === durationFilter.durationUnit) &&
        (durationFilter.durationFrom === '' ||
          item.durationFrom >= Number(durationFilter.durationFrom)) &&
        (durationFilter.durationTo === '' || item.durationTo <= Number(durationFilter.durationTo))
      ) {
        return true;
      }
      return false;
    });

    let sorted = [...filteredData];

    if (sortScoreAsc) {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    } else {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }

    if (!sortScoreAsc) {
      sorted = sorted.sort((a, b) => b.recommendationScore - a.recommendationScore);
    }

    if (!sortPriceAsc) {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } */

  /* switch (sortAttribute.label) {
      case 'score':
        sorted = sorted.sort((a, b) => {
          if (sortAsc) {
            return b.recommendationScore - a.recommendationScore;
          } else {
            return a.recommendationScore - b.recommendationScore;
          }
        });
        break;
      case 'price':
        sorted = sorted.sort((a, b) => {
          if (sortAsc) {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
        break;
      case 'fte':
        sorted = sorted.sort((a, b) => {
          // Assuming fte is represented as a number
          if (sortAsc) {
            return parseInt(a.fte) - parseInt(b.fte);
          } else {
            return parseInt(b.fte) - parseInt(a.fte);
          }
        });
        break;
      case 'duration':
        sorted = sorted.sort((a, b) => {
          // Assuming duration is represented as a number
          if (sortAsc) {
            return parseInt(a.duration) - parseInt(b.duration);
          } else {
            return parseInt(b.duration) - parseInt(a.duration);
          }
        });
        break;
      default:
        break;
    } */

  /* setSortedData(sorted);
  }, [
    pagination.currentData,
    recommendationScores,
    sortScoreAsc,
    sortPriceAsc,
    serviceLevelFilter,
    itKnowhowFilter,
    guiFilter,
    fteFilter,
    priceFilter,
    durationFilter,
  ]); */

  return (
    <React.Fragment>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          maxWidth: '2000px',
          margin: '0 auto',
          height: '3100',
        }}
      >
        <div
          style={{
            flexGrow: '15',
            padding: '0px',
            marginRight: '0px',
          }}
        >
          <Typography variant='h6' gutterBottom>
            {isDeutsch
              ? translationFunction().deutschTranslations.stepper31
              : translationFunction().englishTranslations.stepper31}
          </Typography>
          <List disablePadding /* style={myComponent} */>
            <div>
              {!responseData ? (
                <LinearProgress />
              ) : (
                pagination.currentData &&
                pagination.currentData.map((item: any, index: any) => {
                  const handleDialogOpen = (ind: any) => {
                    setSelectedConnectorIndex(index);
                    const newDialogStates = [...openDialog];
                    newDialogStates[ind] = true;
                    setOpenDialog(newDialogStates);
                  };
                  const handleDialogClose = (ind: any) => {
                    const newDialogStates = [...openDialog];
                    newDialogStates[ind] = false;
                    setOpenDialog(newDialogStates);
                  };
                  const itemsTrueGreen = [];
                  const itemsYellow = [];
                  const itemsFalseRed = [];

                  if (item?.gui) {
                    itemsTrueGreen.push('GUI');
                  } else {
                    itemsFalseRed.push('GUI');
                  }

                  if (item?.hasDocumentation) {
                    itemsTrueGreen.push('Dokumentation');
                  } else {
                    itemsFalseRed.push('Dokumentation');
                  }
                  if (item?.itKnowhow === aufwandThree || aufwandThree === 'high') {
                    itemsTrueGreen.push('IT-Know-How');
                  } else if (item?.itKnowhow === 'medium' && aufwandThree === 'low') {
                    itemsYellow.push('IT-Know-How');
                  } else {
                    itemsFalseRed.push('IT-Know-How');
                  }

                  if (item?.hasSupport) {
                    itemsTrueGreen.push('Support');
                  } else {
                    itemsFalseRed.push('Support');
                  }
                  return (
                    <Paper
                      key={item.id}
                      elevation={0}
                      sx={{
                        p: 1,
                        marginBottom: '10px',
                      }}
                    >
                      <Paper
                        elevation={6}
                        key={item.id}
                        sx={{ py: 1, px: 0 }}
                        style={{
                          borderColor: '#B4B4B4',
                          padding: '10px',
                          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.6)',
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12} md={isMobile ? 12 : isTablet ? 3 : 5}>
                            <div style={{ color: 'grey' }}>{`${
                              index + 1 + pagination.offset
                            }.`}</div>
                            <p></p>
                            <p
                              style={{
                                marginTop: '-8px',
                                marginLeft: '-5px',
                                height: '100px',
                                width: '100px',
                              }}
                            >
                              <img
                                src={
                                  item.connectorName === 'Eclipse Dataspace Components Connector'
                                    ? 'eclipse.png'
                                    : item.connectorName === 'sovity Connector'
                                    ? 'sovity.png'
                                    : item.connectorName === 'Data Intelligence Hub Connector'
                                    ? 't-mobile.png'
                                    : item.connectorName === 'Intel IONOS Orbiter Connector'
                                    ? 'truzzt.jpeg'
                                    : item.connectorName === 'AI.SOV Connector'
                                    ? 'cefriel.png'
                                    : item.connectorName === 'Boot-X Connector'
                                    ? 'huawei.svg.png'
                                    : item.connectorName ===
                                      'ECI Gatewise IDS Connector powered by TNO'
                                    ? 'eci.jpg'
                                    : item.connectorName === 'EdgeDS Connector'
                                    ? 'INTRACOM.png'
                                    : item.connectorName === 'EGI DataHub Connector'
                                    ? 'egi.png'
                                    : item.connectorName === 'FIWARE Data Space Connector'
                                    ? 'fiware.png'
                                    : item.connectorName === 'GATE Dataspace Connector'
                                    ? 'gate.jpeg'
                                    : item.connectorName ===
                                      'GDSO Connector - Tyre Information Service'
                                    ? 'gdso.png'
                                    : item.connectorName ===
                                      'Kharon IDS Connector powered by the Dataspace Connector'
                                    ? 'holonix.png'
                                    : item.connectorName ===
                                      'Mitsubishi Electric Dataspace Connector'
                                    ? 'Mitsubishi.png'
                                    : item.connectorName === 'OneNet Connector'
                                    ? 'onenet.png'
                                    : item.connectorName === 'Tech2B SCSN Connector'
                                    ? 'tech2b.webp'
                                    : item.connectorName === 'TNO Security Gateway (TSG)'
                                    ? 'tno.jpg'
                                    : item.connectorName === 'Tritom Enterprise Connector'
                                    ? 'Tritom.png'
                                    : item.connectorName === 'TRUE Connector'
                                    ? 'eng.png'
                                    : item.connectorName === 'Trusted Supplier Connector'
                                    ? 'edge.webp'
                                    : ''
                                }
                                alt={`Logo für ${item.connectorName}`}
                                style={{
                                  maxWidth: '100px',
                                  maxHeight: '100px',
                                  width: 'auto',
                                  height: 'auto',
                                }}
                              />
                            </p>
                            {isMobile ? (
                              <Typography
                                variant='h6'
                                sx={{ textAlign: 'start', fontWeight: 'bold' }}
                              >
                                {item?.connectorName}
                              </Typography>
                            ) : (
                              ''
                            )}
                            <p>{item?.connectorMaintainer}</p>
                            <p>
                              {item?.serviceLevel
                                .map((level: any) =>
                                  level === 'caas'
                                    ? 'Caas'
                                    : level === 'paas'
                                    ? 'Paas'
                                    : 'Self Service',
                                )
                                .join(', ')}
                            </p>
                            <Grid item xs={isMobile ? 12 : isTablet ? 7 : 12} md={11.1}>
                              <Typography
                                onClick={() => handleDialogOpen(index)}
                                style={{
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  color: '#11998E',
                                }}
                              >
                                {isDeutsch
                                  ? translationFunction().deutschTranslations.stepper35
                                  : translationFunction().englishTranslations.stepper35}{' '}
                              </Typography>
                              <BootstrapDialog
                                onClose={() => handleDialogClose(index)}
                                aria-labelledby='customized-dialog-title'
                                aria-describedby='alert-dialog-description'
                                open={openDialog[index]}
                                maxWidth='lg'
                              >
                                <BootstrapDialogTitle
                                  id='customized-dialog-title'
                                  onClose={() => handleDialogClose(index)}
                                >
                                  {isDeutsch
                                    ? translationFunction().deutschTranslations.stepper36
                                    : translationFunction().englishTranslations.stepper36}{' '}
                                  {selectedConnectorIndex !== null ? item.connectorName : ''}
                                </BootstrapDialogTitle>
                                <DialogContent dividers>
                                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs
                                      value={value}
                                      onChange={handleChange}
                                      aria-label='basic tabs example'
                                      orientation={isMobile ? 'vertical' : 'horizontal'}
                                    >
                                      <Tab
                                        label={
                                          isDeutsch
                                            ? translationFunction().deutschTranslations.stepper37
                                            : translationFunction().englishTranslations.stepper37
                                        }
                                        {...a11yProps(0)}
                                      />
                                      <Tab
                                        label={
                                          isDeutsch
                                            ? translationFunction().deutschTranslations.stepper38
                                            : translationFunction().englishTranslations.stepper38
                                        }
                                        {...a11yProps(1)}
                                      />
                                      <Tab
                                        label={
                                          isDeutsch
                                            ? translationFunction().deutschTranslations.stepper39
                                            : translationFunction().englishTranslations.stepper39
                                        }
                                        {...a11yProps(2)}
                                      />
                                    </Tabs>
                                  </Box>
                                  <CustomTabPanel value={value} index={0}>
                                    {selectedConnectorIndex !== null && (
                                      <TableContainer
                                        component={Paper}
                                        style={{ width: '100%', marginBottom: '20px' }}
                                      >
                                        <Table
                                          sx={{ minWidth: isMobile ? 400 : 700 }}
                                          size='small'
                                          aria-label='a dense table'
                                        >
                                          <TableBody>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Name
                                              </TableCell>
                                              <TableCell>{item.connectorName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper310
                                                  : translationFunction().englishTranslations
                                                      .stepper310}
                                              </TableCell>
                                              <TableCell>
                                                {/* {
                                                  Connectors[selectedConnectorIndex]
                                                    .connectorDescription
                                                } */}
                                                {
                                                  sortedData[selectedConnectorIndex]
                                                    .connectorDescription
                                                }
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch ? 'Zahlung' : 'Payment'}
                                              </TableCell>
                                              <TableCell>
                                                {item.payment === true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch ? 'Preismodell' : 'Pricing Model'}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].pricingModel}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper311
                                                  : translationFunction().englishTranslations
                                                      .stepper311}
                                              </TableCell>
                                              <TableCell>{item.price} Euro</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? 'Zahlungsintervall'
                                                  : 'Payment Interval'}
                                              </TableCell>
                                              <TableCell>{item.paymentInterval}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? 'Abonnementbeschreibung'
                                                  : 'Abonnement Description'}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  sortedData[selectedConnectorIndex]
                                                    .abonnementDescription
                                                }
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? 'Kostenberechnungsbasis'
                                                  : 'Cost Calculation Basis'}
                                              </TableCell>
                                              <TableCell>{item.costCalculationBasis}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? 'Matching zu Benutzerangaben'
                                                  : 'Matching to user information'}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  /* recommendationScores[index] */ item.recommendationScore !==
                                                  undefined
                                                    ? `${Math.floor(
                                                        /* recommendationScores[
                                                        index + pagination.offset
                                                      ] */ item.recommendationScore * 100,
                                                      )}% ${isDeutsch ? 'Score' : 'Score'}`
                                                    : ''
                                                }
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch ? 'Vorname' : 'First Name'}
                                              </TableCell>
                                              <TableCell>{item.contactForename}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch ? 'Nachname' : 'Last Name'}
                                              </TableCell>
                                              <TableCell>{item.contactName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch ? 'Kontakt Email' : 'Contact Email'}
                                              </TableCell>
                                              <TableCell>{item.connectorEmail}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper312
                                                  : translationFunction().englishTranslations
                                                      .stepper312}
                                              </TableCell>
                                              <TableCell>{item.contactLocation}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Website
                                              </TableCell>
                                              <TableCell>{item.connectorWebsite}</TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    )}
                                  </CustomTabPanel>
                                  <CustomTabPanel value={value} index={1}>
                                    {selectedConnectorIndex !== null && (
                                      <TableContainer
                                        component={Paper}
                                        style={{ width: '100%', marginBottom: '20px' }}
                                      >
                                        <Table
                                          sx={{ minWidth: isMobile ? 400 : 700 }}
                                          size='small'
                                          aria-label='a dense table'
                                        >
                                          <TableBody>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Open Source
                                              </TableCell>
                                              <TableCell>{item.openSource}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper314
                                                  : translationFunction().englishTranslations
                                                      .stepper314}
                                              </TableCell>
                                              <TableCell>{item.license}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                GUI
                                              </TableCell>
                                              <TableCell>
                                                {item.gui == true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper315
                                                  : translationFunction().englishTranslations
                                                      .stepper315}
                                              </TableCell>
                                              <TableCell>
                                                {item.dsSpecificGui === true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? 'Selbstimplementierung'
                                                  : 'Self-implementation'}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex]
                                                  .selfImplementation === true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper316
                                                  : translationFunction().englishTranslations
                                                      .stepper316}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].cloudNeeded ===
                                                true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Cloud Provider
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].cloud}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper317
                                                  : translationFunction().englishTranslations
                                                      .stepper317}
                                              </TableCell>
                                              <TableCell>
                                                {item.basedOnODRL === true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper318
                                                  : translationFunction().englishTranslations
                                                      .stepper318}
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  sortedData[selectedConnectorIndex]
                                                    .alternativePolicyExpressionModel
                                                }
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper320
                                                  : translationFunction().englishTranslations
                                                      .stepper320}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[
                                                  selectedConnectorIndex
                                                ].usedProtocols.map((protocol: any, index: any) => (
                                                  <div key={index}>{protocol}</div>
                                                ))}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper321
                                                  : translationFunction().englishTranslations
                                                      .stepper321}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].trl}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    )}
                                  </CustomTabPanel>
                                  <CustomTabPanel value={value} index={2}>
                                    {selectedConnectorIndex !== null && (
                                      <TableContainer
                                        component={Paper}
                                        style={{ width: '100%', marginBottom: '20px' }}
                                      >
                                        <Table
                                          sx={{ minWidth: isMobile ? 400 : 700 }}
                                          size='small'
                                          aria-label='a dense table'
                                        >
                                          <TableBody>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper322
                                                  : translationFunction().englishTranslations
                                                      .stepper322}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].connectorType}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Version
                                              </TableCell>
                                              <TableCell>
                                                {
                                                  sortedData[selectedConnectorIndex]
                                                    .connectorVersion
                                                }
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper323
                                                  : translationFunction().englishTranslations
                                                      .stepper323}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[
                                                  selectedConnectorIndex
                                                ].deploymentType.map(
                                                  (deployment: any, index: any) => (
                                                    <div key={index}>{deployment}</div>
                                                  ),
                                                )}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper324
                                                  : translationFunction().englishTranslations
                                                      .stepper324}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex]
                                                  .regionalRestrictions === true
                                                  ? isDeutsch
                                                    ? 'Ja'
                                                    : 'Yes'
                                                  : isDeutsch
                                                  ? 'Nein'
                                                  : 'No'}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper325
                                                  : translationFunction().englishTranslations
                                                      .stepper325}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[
                                                  selectedConnectorIndex
                                                ].targetIndustrySectors.map(
                                                  (sector: any, index: any) => (
                                                    <div key={index}>{sector}</div>
                                                  ),
                                                )}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                Target Data Space Roles
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[
                                                  selectedConnectorIndex
                                                ].targetDataspaceRoles.map(
                                                  (sector: any, index: any) => (
                                                    <div key={index}>{sector}</div>
                                                  ),
                                                )}
                                              </TableCell>
                                            </TableRow>
                                            <TableRow>
                                              <TableCell style={{ borderLeft: '1px solid #ccc' }}>
                                                {isDeutsch
                                                  ? translationFunction().deutschTranslations
                                                      .stepper327
                                                  : translationFunction().englishTranslations
                                                      .stepper327}
                                              </TableCell>
                                              <TableCell>
                                                {sortedData[selectedConnectorIndex].references}
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    )}
                                  </CustomTabPanel>
                                </DialogContent>
                              </BootstrapDialog>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={isMobile ? 12 : isTablet ? 7 : 12}
                            md={isMobile ? 12 : isTablet ? 3 : 5}
                          >
                            {isMobile ? (
                              ''
                            ) : (
                              <Typography
                                variant='subtitle1'
                                sx={{ textAlign: 'start', fontWeight: 'bold' }}
                              >
                                {item?.connectorName}
                              </Typography>
                            )}
                            {isDeutsch
                              ? translationFunction().deutschTranslations.stepper32
                              : translationFunction().englishTranslations.stepper32}{' '}
                            {item?.durationFrom === item?.durationTo
                              ? item?.durationFrom +
                                (item?.durationUnit === 'months'
                                  ? isDeutsch
                                    ? ' Monat'
                                    : ' Month'
                                  : isDeutsch
                                  ? ' Tag'
                                  : ' Day')
                              : (isDeutsch ? 'Von ' : 'From ') +
                                item?.durationFrom +
                                ' ' +
                                (isDeutsch ? 'bis ' : 'to ') +
                                item?.durationTo +
                                ' ' +
                                (item?.durationUnit === 'months'
                                  ? isDeutsch
                                    ? 'Monaten'
                                    : 'Months'
                                  : item?.durationUnit === 'days'
                                  ? isDeutsch
                                    ? 'Tagen'
                                    : 'Days'
                                  : null)}
                            <br />
                            {isDeutsch
                              ? translationFunction().deutschTranslations.stepper32halb
                              : translationFunction().englishTranslations.stepper32halb}{' '}
                            {item.fte === 'single_person'
                              ? isDeutsch
                                ? 'Eine Person'
                                : 'Single Person'
                              : item.fte === 'small_team'
                              ? isDeutsch
                                ? 'Kleines Team'
                                : 'Small Team'
                              : item.fte === 'large_team'
                              ? isDeutsch
                                ? 'Großes Team'
                                : 'Large Team'
                              : 'Department'}
                            <p></p>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              {itemsTrueGreen.map((itemName) => (
                                <div
                                  key={itemName}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'green',
                                  }}
                                >
                                  <CheckCircleOutlineRoundedIcon style={{ marginRight: '5px' }} />
                                  {itemName}
                                </div>
                              ))}

                              {itemsYellow.map((itemName) => (
                                <div
                                  key={itemName}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'darkorange',
                                  }}
                                >
                                  <CheckCircleOutlineRoundedIcon style={{ marginRight: '5px' }} />
                                  {itemName}
                                </div>
                              ))}

                              {itemsFalseRed.map((itemName) => (
                                <div
                                  key={itemName}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'red',
                                  }}
                                >
                                  <ErrorOutlineRoundedIcon style={{ marginRight: '5px' }} />
                                  {itemName}
                                </div>
                              ))}
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={isMobile ? 12 : isTablet ? 7 : 12}
                            md={isMobile ? 12 : isTablet ? 1 : 2}
                            style={{ marginLeft: '-20px' }}
                          >
                            <Typography variant='body1' align='right'>
                              <Grid>
                                {
                                  <div style={{ fontSize: '15px' }}>
                                    {
                                      /* recommendationScores[index + pagination.offset] */ item.recommendationScore !==
                                      undefined
                                        ? `${Math.floor(
                                            /* recommendationScores[index + pagination.offset] */ item.recommendationScore *
                                              100,
                                          )}% ${isDeutsch ? 'Score' : 'Score'}`
                                        : ''
                                    }
                                  </div>
                                }
                                <div
                                  style={{
                                    color: 'grey',
                                    fontWeight: 'bold',
                                    fontSize: '25px',
                                    display: 'inline-flex',
                                    flexDirection: 'row',
                                  }}
                                >
                                  {`${item?.price} €`}
                                  <Tooltip title='Info' placement='top-start'>
                                    <InfoOutlinedIcon
                                      color='disabled'
                                      fontSize='small'
                                      style={{
                                        marginLeft: '5px',
                                        paddingTop: '5px',
                                      }}
                                    />
                                  </Tooltip>
                                </div>
                                <text style={{ fontSize: '10px' }}>Durchschnitt pro Monat</text>
                              </Grid>
                              {isMobile ? '' : isTablet ? '' : <br />}
                              {isMobile ? '' : isTablet ? '' : <br />}
                              {isMobile ? '' : isTablet ? '' : <br />}
                              <Grid
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}
                              >
                                <Button
                                  variant='contained'
                                  sx={{ mt: 3, ml: 1 }}
                                  href={item?.connectorWebsite}
                                  target='_blank'
                                >
                                  Weiter
                                </Button>
                              </Grid>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Paper>
                  );
                })
              )}
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'activePaginate'}
              />
            </div>
          </List>
        </div>
        <div id='drawer-container' style={{ position: 'relative' }}>
          <IconButton
            color='primary'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <FilterListIcon />
          </IconButton>

          <Drawer
            sx={{
              flexGrow: 1,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                position: 'absolute',
                paddingLeft: '0px',
                transition: 'none !important',
              },
            }}
            variant='persistent'
            anchor='right'
            open={open}
            PaperProps={{ style: { position: 'absolute' } }}
            BackdropProps={{ style: { position: 'absolute', overflow: 'hidden' } }}
            ModalProps={{
              container: document.getElementById('drawer-container'),
              style: { position: 'absolute', overflow: 'hidden' },
              keepMounted: true,
            }}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <div style={{ padding: '20px' }}>
              <Box display='flex' alignItems='center' width='220px'>
                <Typography>{isDeutsch ? 'Sortieren nach' : 'Sort by'}</Typography>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  style={{ width: '180px', height: '30px', marginLeft: '4px' }}
                >
                  <MenuItem value='score_high'>
                    {isDeutsch ? 'Score(Hoch)' : 'Score (High)'}
                  </MenuItem>
                  <MenuItem value='score_low'>
                    {isDeutsch ? 'Score(Niedrig)' : 'Score (Low)'}
                  </MenuItem>
                  <MenuItem value='fte_low'>{isDeutsch ? 'FTE (Niedrig)' : 'FTE (Low)'}</MenuItem>
                  <MenuItem value='fte_high'>{isDeutsch ? 'FTE (Hoch)' : 'FTE (High)'}</MenuItem>
                  <MenuItem value='price_low'>
                    {isDeutsch ? 'Preis (Niedrig)' : 'Price (Low)'}
                  </MenuItem>
                  <MenuItem value='price_high'>
                    {isDeutsch ? 'Preis (Hoch)' : 'Price (High)'}
                  </MenuItem>
                  <MenuItem value='duration_low'>
                    {isDeutsch ? 'Dauer (Niedrig)' : 'Duration (Low)'}
                  </MenuItem>
                  <MenuItem value='duration_high'>
                    {isDeutsch ? 'Dauer (Hoch)' : 'Duration (High)'}
                  </MenuItem>
                </Select>
              </Box>
              <br />
              <Box sx={{ width: 200 }}>
                <Typography>IT Knowhow</Typography>
                <StyledSlider
                  aria-label='IT Knowhow Filter'
                  value={
                    itKnowhowFilter === 'low'
                      ? 33
                      : itKnowhowFilter === 'medium'
                      ? 67
                      : itKnowhowFilter === 'high'
                      ? 100
                      : 0
                  }
                  onChange={(event, value) => handleItKnowhowChange(event, value as number)}
                  getAriaValueText={(value) => `${value}`}
                  step={null}
                  marks={itKnowhow}
                  track={false}
                />
              </Box>
              <Box sx={{ width: 200 }}>
                <Typography>Service Level</Typography>
                {/* <StyledSlider
                  aria-label='Service Level Filter'
                  value={
                    serviceLevel.find((level) => level.label === serviceLevelFilter)?.value || 0
                  }
                  onChange={(event, value) => handleServiceLevelChange(event, value as number)}
                  getAriaValueText={(value) => `${value}`}
                  step={null}
                  marks={serviceLevel}
                  track={false}
                /> */}
                <StyledSlider
                  aria-label='Service Level Filter'
                  value={
                    serviceLevelFilter === 'caas'
                      ? 33
                      : serviceLevelFilter === 'paas'
                      ? 67
                      : serviceLevelFilter === 'self_service'
                      ? 100
                      : 0
                  }
                  onChange={(event, value) => handleServiceLevelChange(event, value as number)}
                  getAriaValueText={(value) => `${value}`}
                  step={null}
                  marks={serviceLevel}
                  track={false}
                />
              </Box>
              <Box sx={{ width: 200 }}>
                <Typography>Usage Policies</Typography>
                <StyledSlider
                  aria-label='Usage Policies'
                  value={odrlFilter === null ? 0 : odrlFilter ? 50 : 100}
                  onChange={handleOdrlChange}
                  step={null}
                  valueLabelDisplay='auto'
                  marks={basedOnODRL}
                  track={false}
                />
              </Box>
              <Box sx={{ width: 200 }}>
                <Typography>Gui</Typography>
                <StyledSlider
                  aria-label='Gui'
                  value={guiFilter === null ? 0 : guiFilter ? 50 : 100} // Map boolean value to slider value
                  onChange={handleGuiChange}
                  step={null}
                  valueLabelDisplay='auto'
                  marks={gui}
                  track={false}
                />
              </Box>
              <Box sx={{ width: 200 }}>
                <Typography>Arbeitsaufwand</Typography>
                {/* <StyledSlider
                  aria-label='FTE Filter'
                  value={fte.find((level) => level.label === fteFilter)?.value || 0}
                  onChange={(event, value) => handleFteChange(event, value as number)}
                  getAriaValueText={(value) => `${value}`}
                  step={null}
                  marks={fte}
                  track={false}
                /> */}
                <StyledSlider
                  aria-label='FTE Filter'
                  value={
                    fteFilter === 'single_person'
                      ? 25
                      : fteFilter === 'small_team'
                      ? 50
                      : fteFilter === 'large_team'
                      ? 75
                      : fteFilter === 'department'
                      ? 100
                      : 0
                  }
                  onChange={(event, value) => handleFteChange(event, value as number)}
                  getAriaValueText={(value) => `${value}`}
                  step={null}
                  marks={fte}
                  track={false}
                />
              </Box>
              <br />
              <Box sx={{ width: 200, '& > :not(style) + :not(style)': { marginTop: '10px' } }}>
                <TextField
                  label={isDeutsch ? 'Preis von' : 'Price From'}
                  type='number'
                  value={priceFilter.from}
                  onChange={handlePriceChange('from')}
                  fullWidth
                  sx={{ width: '220px' }}
                />
                <TextField
                  label={isDeutsch ? 'Preis bis' : 'Price To'}
                  type='number'
                  value={priceFilter.to}
                  onChange={handlePriceChange('to')}
                  fullWidth
                  sx={{ width: '220px' }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label={isDeutsch ? 'Von' : 'From'}
                      type='number'
                      value={durationFilter.durationFrom}
                      onChange={handleDurationChange('durationFrom')}
                      fullWidth
                      sx={{ width: '110px', marginBottom: '8px' }}
                    />
                    <TextField
                      label={isDeutsch ? 'bis' : 'To'}
                      type='number'
                      value={durationFilter.durationTo}
                      onChange={handleDurationChange('durationTo')}
                      fullWidth
                      sx={{ width: '110px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      label={isDeutsch ? 'Einheit' : 'Unit'}
                      value={durationFilter.durationUnitFrom}
                      onChange={handleDurationChange('durationUnitFrom')}
                      fullWidth
                      sx={{ width: '110px', marginBottom: '8px' }}
                    >
                      <MenuItem value=''>{isDeutsch ? 'Keine' : 'None'}</MenuItem>
                      <MenuItem value='days'>{isDeutsch ? 'Tag' : 'Day'}</MenuItem>
                      <MenuItem value='months'>{isDeutsch ? 'Monat' : 'Month'}</MenuItem>
                    </TextField>
                    <TextField
                      select
                      label={isDeutsch ? 'Einheit' : 'Unit'}
                      value={durationFilter.durationUnitTo}
                      onChange={handleDurationChange('durationUnitTo')}
                      fullWidth
                      sx={{ width: '110px' }}
                    >
                      <MenuItem value=''>{isDeutsch ? 'Keine' : 'None'}</MenuItem>
                      <MenuItem value='days'>{isDeutsch ? 'Tag' : 'Day'}</MenuItem>
                      <MenuItem value='months'>{isDeutsch ? 'Monat' : 'Month'}</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
              <br />
              {/* <Box display='flex' alignItems='center' width='220px'>
                <Typography>Sortieren nach</Typography>
                <Select
                  value={sortOption}
                  onChange={handleSortChange}
                  style={{ width: '180px', height: '30px', marginLeft: '4px' }}
                >
                  <MenuItem value='score_high'>Score (High)</MenuItem>
                  <MenuItem value='score_low'>Score (Low)</MenuItem>
                  <MenuItem value='fte_low'>FTE (Low)</MenuItem>
                  <MenuItem value='fte_high'>FTE (High)</MenuItem>
                  <MenuItem value='price_low'>Price (Low)</MenuItem>
                  <MenuItem value='price_high'>Price (High)</MenuItem>
                  <MenuItem value='duration_low'>Duration (Low)</MenuItem>
                  <MenuItem value='duration_high'>Duration (High)</MenuItem>
                </Select>
              </Box> */}
            </div>
          </Drawer>
        </div>
      </div>
    </React.Fragment>
  );
}
