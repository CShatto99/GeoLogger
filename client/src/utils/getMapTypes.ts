import { SECURE_PROTOCOL } from '../constants';
import darkV10 from '../assets/img/dark-v10.png';
import lightV10 from '../assets/img/light-v10.png';
import outdoorsV11 from '../assets/img/outdoors-v11.png';
import satelliteV9 from '../assets/img/satellite-v9.png';

const mapTypes = [
  {
    title: 'Outdoors V11',
    style: 'outdoors-v11',
    image: outdoorsV11,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/outdoors-v11.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Light V10',
    style: 'light-v10',
    image: lightV10,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/light-v10.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Dark V10',
    style: 'dark-v10',
    image: darkV10,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/dark-v10.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Streets V11',
    style: 'streets-v11',
    image: satelliteV9,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/streets-v11.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Navigation Day V1',
    style: 'navigation-day-v1',
    image: satelliteV9,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/navigation-day-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
  {
    title: 'Navigation Night V1',
    style: 'navigation-night-v1',
    image: satelliteV9,
    demo: `${SECURE_PROTOCOL}://api.mapbox.com/styles/v1/mapbox/navigation-night-v1.html?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg#5.16/31.166/-99.262`,
  },
];

export default mapTypes;
