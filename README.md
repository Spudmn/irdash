# iRacing Dashboard

iRacing Dashboard is a simple yet powerful dashboard for iRacing. It replaces the in-game dashboard and is supposed to run on a dedicated monitor (usually mounted right behind your steering wheel). Additionally, it can also run as an overlay to a windowed iRacing instance.

## Installation

Download the [latest release](https://github.com/pminnieur/irdash/releases) of a 32bit or 64bit version, unzip it to your preferred destination and run `irdash.exe`.

You also need to run the iRacing Browser Apps server which can be downloaded from [kutu](http://ir-apps.kutu.ru/). Its simple as that.

## Customization

There are several configuration settings to adjust irdash to your needs. You can open the configuration with `Ctrl+,` and use a minimal
GUI. If you use the irdash configuration GUI, you may not have to restart irdash. The other option is to modify the configuration files directly as described below, where you may have to restart irdash to apply the configuration changes.

### iRacing / Kutu

Create a `kutu.json` file in `%APPDATA%\irdash`. **You may have to restart irdash if you change the configuration.**

``` json
{
    "host": "localhost:8182",
    "fps": 30,
    "ibt": false
}
```

By default, irdash connects to `localhost:8182` with `30` fps and without reading ibt files.

### Parameters

| Name | Description | Default | Type |
| ---- | ----------- | ------- | ---- |
| host | hostname and port number | localhost:8182 | string |
| fps | frames / updates per second | 30 | number |
| ibt | should read ibt files | false | bool |

### Shift Points

Create a `shift_points.json` file in `%APPDATA%\irdash`. **You may have to restart irdash if you change the configuration.**

``` json
{
    "73": {
        "_car": "Audi R8 LMS",
        "1": 7899,
        "2": 7743,
        "3": 7983,
        "_": "..."
    },
    "53": {
        "_car": "BMW Z4 GT3",
        "1": 8568,
        "2": 8749,
        "3": 8694,
        "_": "..."
    }
}
```

By default, irdash has no custom gear shift points and will use the iRacing telemetry data for each car. Use the iRacing car id
and add custom shift points for each gear. If you leave a car or gear out, irdash will use the iRacing telemetry data.

### Window

Create a `window.json` file in `%APPDATA%\irdash`. **You may have to restart irdash if you change the configuration.**

``` json
{
    "width": 800,
    "height": 480,
    "posX": null,
    "posY": null,
    "fixed": false,
    "debug": false
}
```

By default, irdash launches as a movable `800x480` pixel window which you can drag to your preferred location. If you want it to sit in a fixed position (e.g. offset on an external monitor or as an ingame overlay), you can configure the absolute position in `window.json` by setting the `posX` and `posY` parameters. To disable moving/dragging, simple set `fixed` to `true`.

### Parameters

| Name | Description | Default | Unit |
| ---- | ----------- | ------- | ---- |
| width | window width | 800 | pixel |
| height | window height | 480 | pixel |
| posX | window horizontal position | null | pixel |
| posY | window vertical position | null | pixel |
| fixed | disables window moving/dragging | false | bool |
| debug | for development only | false | bool |
