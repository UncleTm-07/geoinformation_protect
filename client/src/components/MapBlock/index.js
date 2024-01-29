import React, {useContext, useEffect, useState} from 'react';
import {CameraFlyTo, Entity, EntityDescription, LabelGraphics, Viewer} from 'resium';
import { EllipseGraphics  } from 'resium';
import {ArcGisMapServerImageryProvider, Cartesian3, Color, LabelStyle} from 'cesium';
import * as Cesium from "cesium";
import "./index.css"

export default function MapBlock({mines, servers, coordinateFly}) {
    const [_mines, setMines] = useState();
    const [_servers, setServers] = useState();

    let viewer;

    useEffect(() => {
        if (Array.isArray(mines) && mines.length > 0) setMines(mines)

    }, [mines])

    useEffect(() => {
        if (Array.isArray(servers) && servers.length > 0) setServers(servers)

    }, [servers])

    useEffect(() => {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MGExODEwNy00N2JiLTQ3ODctYmE5YS1kY2JhZjM4ODY2ZTQiLCJpZCI6MTc1NTY0LCJpYXQiOjE3MDYzMzg1Nzd9.ARWiVmIv4GhTJXvDNETKLn1uDcdeIecSmo3hZnzckgM';
    }, []);

    const handleReady = (tileset) => {
        if (viewer) {
            viewer.zoomTo(tileset);
        }
    };




    const getTypeOfMine = (type) => {
        switch (type) {
            case "anti-personnel":
                return "протипіхотна міна"
            case "anti-tank":
                return "протитанкова міна"
            case "anti-transport":
                return "протитранспортна міна"
            case "not specified":
                return "не визначено"
        }
    }

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
            {
                coordinateFly.latitude?
                    <CameraFlyTo destination={Cartesian3.fromDegrees(Number(coordinateFly?.longitude), Number(coordinateFly?.latitude), 6000)} />
                    :
                    null
            }

            {_mines?.map((mine) => (
                <Entity
                    key={`PointMine-${mine.id}`}
                    name={`Mine №${mine.id}`}
                    position={Cartesian3.fromDegrees(mine.longitude, mine.latitude, 4)}
                    point={{ pixelSize: 5, color: mine.status === "active" ? Color.RED : Color.GRAY}}
                >
                    <EntityDescription>
                        <h1>Тип міни: {getTypeOfMine(mine.type)}</h1>
                        <span>Статус загрози: {mine.status === "active" ? "працює" : "не працює"}</span>
                        <br/>
                        <span>Приблизний радіус ураження: {mine.radius} метрів</span>
                        <br/>
                        <img width={400} src={mine.img} alt=""/>
                    </EntityDescription>
                    <EllipseGraphics
                        center={Cartesian3.fromDegrees(mine.longitude, mine.latitude, 3)}
                        semiMajorAxis={mine.radius}
                        semiMinorAxis={mine.radius}
                        material={Color.RED.withAlpha(0.3)}
                        outline={true}
                        outlineColor={Color.YELLOW}
                        height={0}
                        numberOfVerticalLines={64}
                    />
                </Entity>
            ))}
            {_servers?.map((server) => (
                <Entity
                    key={`PointServer-${server.id}`}
                    name={`Контрольний пункт №${server.id}`}
                    position={Cartesian3.fromDegrees(server.longitude, server.latitude, 2)}
                    point={{ pixelSize: 20, color: server.status === "active" ? Color.BLUE : Color.GRAY}}
                >
                    <LabelGraphics
                        text={`Контрольний пункт №${server.id}`}
                        font="20px Helvetica"
                        fillColor={Color.SKYBLUE}
                        outlineColor={Color.BLACK}
                        outlineWidth={2}
                        style={LabelStyle.FILL_AND_OUTLINE}
                        eyeOffset={new Cartesian3(0, -40, -10)}
                    />

                    <EllipseGraphics
                        center={Cartesian3.fromDegrees(server.longitude, server.latitude, 1)}
                        semiMajorAxis={server.radius}
                        semiMinorAxis={server.radius}
                        material={Color.BLUE.withAlpha(0.3)}
                        outline={true}
                        outlineColor={Color.GREEN}
                        height={0}
                        numberOfVerticalLines={64}
                    />
                </Entity>
            ))}
        </Viewer>
    );
};
