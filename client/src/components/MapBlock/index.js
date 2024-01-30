import React, {useEffect, useRef, useState} from 'react';
import { CameraFlyTo, Entity, EntityDescription,Viewer, LabelGraphics, EllipseGraphics } from 'resium';
import {Cartesian3, Color, LabelStyle, ScreenSpaceEventHandler} from 'cesium';
import * as Cesium from "cesium";
import "./index.css"

export default function MapBlock({mines, servers, coordinateFly, createTarget}) {
    const [_mines, setMines] = useState();
    const [_servers, setServers] = useState();

    const [rerender, setRerender] = useState(false)

    let [arrayOfPoint, setArrayOfPoint] = useState([])

    const [viewer, setViewer] = useState(null);
    const viewerRef = useRef(null);

    const [screenSpaceEventHandler, setScreenSpaceEventHandler] = useState(null);

    const forceRerender = () => setRerender(!rerender)

    function generatePoint(longitude, latitude) {
        setArrayOfPoint(prevArray => {
            if (prevArray && prevArray.length > 0) {
                if (
                    prevArray[prevArray.length - 1].longitude !== longitude ||
                    prevArray[prevArray.length - 1].latitude !== latitude
                ) {
                    return [...prevArray, { id: prevArray.length + 1, longitude, latitude }];
                }
            } else {
                return [{ id: 1, longitude, latitude }];
            }

            // If no new point is added, return the previous array
            return prevArray;
        });
        forceRerender()

    }

    useEffect(() => {
        const arr = arrayOfPoint
        setArrayOfPoint(arr)
    }, [arrayOfPoint])


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (viewerRef.current) {
                setViewer(viewerRef.current);

                const handler = new ScreenSpaceEventHandler(viewerRef.current.scene.canvas);
                setScreenSpaceEventHandler(handler);

                handler.setInputAction((e) => {
                    let {position} = e

                    if (!position) {
                        return;
                    }

                    let ellipsoid = viewerRef.current.scene.globe.ellipsoid;
                    let cartesian = viewerRef.current.camera.pickEllipsoid(position, ellipsoid);

                    if (!cartesian) {
                        return;
                    }

                    let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    let longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    let latitude = Cesium.Math.toDegrees(cartographic.latitude);
                    generatePoint(longitude, latitude)

                }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

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
        if (viewerRef.current) {
            viewerRef.current.zoomTo(tileset);
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
        <div>
            <Viewer
                full
                imageryProvider={new Cesium.ArcGisMapServerImageryProvider({
                    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi',
                })}
                ref={(e) => {
                    viewerRef.current = e && e.cesiumElement;
                }}
                style={{
                    height: 800,
                    padding: 20,
                }}
            >
                {
                    coordinateFly.latitude ?
                        <CameraFlyTo
                            destination={Cartesian3.fromDegrees(Number(coordinateFly?.longitude), Number(coordinateFly?.latitude), 6000)}/>
                        :
                        null
                }

                {
                    arrayOfPoint?.map((value, index) => (
                        <Entity
                            key={`Point-${value.id}`}
                            name={`Point-${value.id}`}
                            position={Cartesian3.fromDegrees(value.longitude, value.latitude, 4)}
                            point={{pixelSize: 20, color: Color.GREEN}}
                        >
                            <LabelGraphics
                                text={`${value.id}`}
                                font="12px Helvetica"
                                outlineColor={Color.WHITE}
                                outlineWidth={2}
                                style={LabelStyle.FILL_AND_OUTLINE}
                                eyeOffset={new Cartesian3(0, 0, -10)}
                            />
                        </Entity>
                    ))

                }

                {
                    arrayOfPoint?.map((value, index) => (
                        arrayOfPoint.length-1 !== index ?
                            <Entity
                                key={`Line-${value.id}`}
                                polyline={{
                                    positions: [Cartesian3.fromDegrees(value.longitude, value.latitude, 0),
                                        Cartesian3.fromDegrees(arrayOfPoint[index+1].longitude, arrayOfPoint[index+1].latitude, 0)],
                                    width: 2,
                                    material: Color.GREEN,
                                }}
                            />
                            :
                            <Entity
                                key={`Line-${value.id}`}
                                polyline={{
                                    positions: [Cartesian3.fromDegrees(value.longitude, value.latitude, 0),
                                        Cartesian3.fromDegrees(arrayOfPoint[0].longitude, arrayOfPoint[0].latitude, 0)],
                                    width: 2,
                                    material: Color.GREEN,
                                }}
                            />
                    ))
                }

                {_mines?.map((mine) => (
                    <Entity
                        key={`PointMine-${mine.id}`}
                        name={`Mine №${mine.id}`}
                        position={Cartesian3.fromDegrees(mine.longitude, mine.latitude, 4)}
                        point={{pixelSize: 5, color: mine.status === "active" ? Color.RED : Color.GRAY}}
                    >
                        <EntityDescription>
                            <h1>Тип міни: {getTypeOfMine(mine.type)}</h1>
                            <span>Статус загрози: {mine.status === "active" ? "працює" : "не працює"}</span>
                            <br/>
                            <span>Приблизний радіус ураження: {mine.radius} метрів</span>
                            <br/>
                            <img width={400} src={mine.img} alt=""/>
                        </EntityDescription>
                    </Entity>
                ))}
                {_servers?.map((server) => (
                    <Entity
                        key={`PointServer-${server.id}`}
                        name={`Ділянка №${server.id}`}
                        position={Cartesian3.fromDegrees(server.longitude, server.latitude, 2)}
                    >
                        <LabelGraphics
                            text={`Ділянка №${server.id}`}
                            font="20px Helvetica"
                            fillColor={Color.SKYBLUE}
                            outlineColor={Color.BLACK}
                            outlineWidth={2}
                            style={LabelStyle.FILL_AND_OUTLINE}
                            eyeOffset={new Cartesian3(0, -100, -10)}
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
            <div style={{padding: '800px 0 0 30%', display: 'flex', gap: '10px', color:"white"}}>
                <h4>Точки виділеної області:</h4>
                <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
                    {
                        arrayOfPoint.map((value, index) => (
                            <span key={`Point-${index}`}>
                                {value.id} - {value.longitude}, {value.latitude}
                            </span>
                        ))
                    }
                </div>
                <div>
                    <button style={{padding: '10px', fontWeight: 'bold'}} onClick={() => {
                        createTarget(arrayOfPoint)
                        setTimeout(() => {
                            setArrayOfPoint([])
                        },300)
                    }}>
                        Створити область знищення
                    </button>
                </div>
            </div>
        </div>
    );
};
