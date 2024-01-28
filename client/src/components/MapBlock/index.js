import React, {useEffect} from 'react';
import {CameraFlyTo, CylinderGraphics, Entity, Viewer } from 'resium';
import { EllipseGraphics  } from 'resium';
import {ArcGisMapServerImageryProvider, Cartesian3, Color, SceneMode} from 'cesium';
import * as Cesium from "cesium";
import "./index.css"


const MapBlock = () => {

    let viewer;

    useEffect(() => {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MGExODEwNy00N2JiLTQ3ODctYmE5YS1kY2JhZjM4ODY2ZTQiLCJpZCI6MTc1NTY0LCJpYXQiOjE3MDYzMzg1Nzd9.ARWiVmIv4GhTJXvDNETKLn1uDcdeIecSmo3hZnzckgM';
    }, []);

    const handleReady = (tileset) => {
        if (viewer) {
            viewer.zoomTo(tileset);
        }
    };

    return (
        <Viewer
            full
            imageryProvider={ new ArcGisMapServerImageryProvider({
                url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi"
            })}
            ref={(e) => {
                viewer = e && e.cesiumElement;
            }}
            style={{
                height: 900,
                padding: 20,
            }}
        >
            <CameraFlyTo destination={Cartesian3.fromDegrees(30.74612, 50.14317, 3000000)} />

        </Viewer>
    );
};

export default MapBlock;