# pg-overlays

Broadcast overlays for Proving Grounds, a Splatoon event by Inkling Performance Labs.

**Use of these graphics are protected via copyright. Do not reuse or redistribute this graphics package, even after modification. [See the license here](LICENSE). This repo serves as a reference and to help you make your own graphics from scratch.**

## Install

1. Follow the instruction [here in ipl-overlay-controls](https://github.com/inkfarer/ipl-overlay-controls) to do
   the initial setup of NodeCG and Overlay Control Panel. This overlay requires version 4.1.0 or higher.

2. Install the pg-overlays bundle into `nodecg/bundles` using `git clone https://github.com/IPLSplatoon/pg-overlays.git`.

3. Install npm dependencies in the newly created pg-overlays directory using `npm install`

3. Start nodecg using the `nodecg start` command in the `nodecg` folder.

4. Access the dashboard from `http://localhost:9090/` in your browser.

5. Access the graphics from the "Graphics" tab in the dashboard. Add the overlays to your streaming application of
   choice using a **browser** source. Use a chromium based browser to access graphics (Chrome, Edge, Opera).
   
## Usage

Start NodeCG. By default, the dashboard can be accessed from `localhost:9090` in your browser.

From the dashboard, URLs to the graphics can be found from the graphics tab. To use them, they should be added as
browser sources in a broadcast application such as OBS Studio. The graphics should be used at a resolution of
1920x1080 and open in a chromium based browser.

## Credits

Code was very inspired by other IPL overlays created by [inkfarer](https://github.com/inkfarer)

Splatoon 2/3 map portraits are property of Nintendo and were downloaded from
the [Splatoon wiki.](https://splatoonwiki.org/)
