# iRacing Dashboard

iRacing Dashboard is a simple yet powerful dashboard for iRacing. It replaces the in-game dashboard and is supposed to run on a dedicated monitor (usually mounted right behind your steering wheel). Additionally, it can also run as an overlay to a windowed iRacing instance.

## Installation

Download the [latest release](https://github.com/pminnieur/irdash/releases) of a 32bit or 64bit version, unzip it to your preferred destination and run `irdash.exe`.

You also need to run the iRacing Browser Apps server which can be downloaded from [kutu](http://ir-apps.kutu.ru/). Its simple as that.

## Customization

Create a `window.json` file in `%APPDATA%\irdash`. **You have to restart irdash every time you change the configuration.**

### Configuration

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
