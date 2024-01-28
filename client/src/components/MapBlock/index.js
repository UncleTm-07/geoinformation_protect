import React, {useContext, useEffect, useState} from 'react';
import {CameraFlyTo, Entity, Viewer} from 'resium';
import { EllipseGraphics  } from 'resium';
import {ArcGisMapServerImageryProvider, Cartesian3, Color} from 'cesium';
import * as Cesium from "cesium";
import "./index.css"
import {Context} from "../../index";

export default function MapBlock({mines}) {
    const [_mines, setMines] = useState();

    let viewer;

    useEffect(() => {
        if (Array.isArray(mines) && mines.length > 0) setMines(mines)

    }, [mines])

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
            {_mines?.map((value) => (
                <Entity
                    key={`Point-${value.id}`}
                    name={"some"}
                    position={Cartesian3.fromDegrees(value.longitude, value.latitude, 0)}
                    point={{ pixelSize: 10, color: Color.RED }}
                >
                    <EllipseGraphics
                        center={Cartesian3.fromDegrees(value.longitude, value.latitude, 0)}
                        semiMajorAxis={10000}
                        semiMinorAxis={10000}
                        material={Color.BLUE.withAlpha(0.3)}
                        outline={true}
                        outlineColor={Color.BLUE}
                        height={0}
                        numberOfVerticalLines={64}
                    />
                </Entity>
            ))}
        </Viewer>
    );
};
