import { SECURE_PROTOCOL } from '../constants';
import outdoorsV11 from '../assets/img/outdoors.png';
import light from '../assets/img/light.png';
import dark from '../assets/img/dark.png';
import satellite from '../assets/img/satellite.png';
import navigationDay from '../assets/img/navigation-day.png';
import navigationNight from '../assets/img/navigation-night.png';

const mapTypes = [
  {
    title: 'Outdoors',
    style: 'outdoors-v11',
    image: outdoorsV11,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/outdoors-v11.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Light',
    style: 'light-v10',
    image: light,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/light-v10.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Dark',
    style: 'dark-v10',
    image: dark,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/dark-v10.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Satellite',
    style: 'satellite-v9',
    image: satellite,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/satellite-v9.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Navigation Day',
    style: 'navigation-day-v1',
    image: navigationDay,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/navigation-day-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Navigation Night',
    style: 'navigation-night-v1',
    image: navigationNight,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/navigation-night-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
];

export default mapTypes;
