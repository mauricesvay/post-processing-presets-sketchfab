function initializeMaterials() {
    console.info( 'Initializing materials extensions' );

    var materialsPanelReady = false;
    observeDOM( document.body, function () {
        var panel = $( '[data-panel="materials"] .group-widget' );
        if ( panel.length ) {

            if ( materialsPanelReady === false ) {
                onMaterialsReady();
                materialsPanelReady = true;
            }

        }
    } );

    var materialChannels = [
        '#PBRGroup',
        '#RoughnessGroup',
        '#DiffuseColorGroup',
        '#SpecularColorGroup',
        '#DisplacementGroup',
        '#NormalBumpGroup',
        '#DiffuseIntensityGroup',
        '#AOPBRGroup',
        '#CavityPBRGroup',
        '#OpacityGroup',
        '#EmitColorGroup',
        '#ReflectionGroup',
        '#CullFaceGroup'
    ];
}

/**
 * Materials
 ******************************************************************************/
function onMaterialsReady() {
    $container = $( '[data-panel="materials"] > .vertical-widget > .widget-wrapper > .children' );
    $container.prepend( [
        '<div style="padding:15px 15px 5px 15px">',
        '<select class="button btn-small" id="materialPresets"></select><br>',
        '<button class="button btn-small" id="applyMaterial" type="button">Apply</button>&nbsp;',
        '<button class="button btn-small" id="deleteMaterial" type="button">Delete</button>&nbsp;',
        '<button class="button btn-small" id="saveMaterial" type="button">Save</button><br>',
        '<button class="button btn-small" id="exportMaterial" type="button">Export</button>&nbsp;',
        '<button class="button btn-small" id="importMaterial" type="button">Import</button><br>',
        '<button class="button btn-small" id="downloadTextures" type="button">Download all textures</button>',
        '</div>'
    ].join( '' ) );

    refreshMaterialList();

    $( '#saveMaterial' ).on( 'click', saveMaterial );
    $( '#deleteMaterial' ).on( 'click', deleteMaterial );
    $( '#applyMaterial' ).on( 'click', applyMaterial );

    $( '#exportMaterial' ).on( 'click', exportMaterial );
    $( '#importMaterial' ).on( 'click', importMaterial );

    $( '#downloadTextures' ).on( 'click', downloadTextures );
}

function refreshMaterialList() {
    var prefix = 'skfb_material_';
    var db = GM_listValues();

    var materials = db.filter( function ( name ) {
        return ( name.indexOf( prefix ) === 0 )
    } );
    var options = materials.map( function ( name ) {
        return '<option value="' + name + '">' + name.replace( prefix, '' ) + '</option>';
    } );

    $( '#materialPresets' ).html( options );
}

function saveMaterial() {
    var materialName;
    var prefix = 'skfb_material_';

    if ( materialName = prompt( 'Enter a name for this material' ) ) {
        var data = getCurrentMaterial();
        materialName = prefix + materialName;
        GM_setValue( materialName, JSON.stringify( data ) );
        refreshMaterialList();
    }
}

function deleteMaterial() {
    var materialName = $( '#materialPresets' ).val();
    GM_deleteValue( materialName );
    refreshMaterialList();
}

function applyMaterial() {
    var materialName = $( '#materialPresets' ).val();
    var material = JSON.parse( GM_getValue( materialName, false ) );
    if ( material ) {
        setCurrentMaterial( material );
    }
}

/**
 * Export Materials
 ******************************************************************************/
function collectWidgetValues( $el ) {

    var groupWidget = new Group( $el );

    var toggleButtonValues = [];
    var checkboxValues = [];
    var sliderValues = [];
    var sliderImageValues = [];

    var typeElements = $el.find( '.togglebutton-widget' );
    typeElements.each( function ( i, element ) {
        var typeWidget = new ToggleButton( $( element ) );
        toggleButtonValues.push( typeWidget.getValue() );
    } );

    var checkboxElements = $el.find( '.checkbox-widget' );
    checkboxElements.each( function ( i, element ) {
        var checkboxWidget = new Checkbox( $( element ) );
        checkboxValues.push( checkboxWidget.isChecked() );
    } );

    var sliderElements = $el.find( '.numbered-slider-widget' );
    sliderElements.each( function ( i, element ) {
        if ( $( element ).parents( '.slidered-image-widget' ).length ) {
            return;
        }
        var sliderWidget = new NumberSlider( $( element ) );
        sliderValues.push( sliderWidget.getValue() );
    } );

    var sliderImageElements = $el.find( '.slidered-image-widget' );
    sliderImageElements.each( function ( i, element ) {
        var sliderImageWidget = new ImageNumberSlider( $( element ) );
        sliderImageValues.push( sliderImageWidget.getValue() );
        sliderImageValues.push( sliderImageWidget.getColor() );
        sliderImageValues.push( sliderImageWidget.getTexture() );
    } );

    return {
        enabled: groupWidget.isEnabled(),
        toggleButtonValues: toggleButtonValues,
        checkboxValues: checkboxValues,
        sliderValues: sliderValues,
        sliderImageValues: sliderImageValues
    }
}

function getCurrentMaterial() {
    var groups = [
        function pbrMaps( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'workflow': widgetValues.toggleButtonValues[ 0 ],

                'baseValue': widgetValues.sliderImageValues[ 0 ],
                'baseColor': widgetValues.sliderImageValues[ 1 ],
                'baseMap': widgetValues.sliderImageValues[ 2 ],

                'metalnessValue': widgetValues.sliderImageValues[ 3 ],
                'metalnessMap': widgetValues.sliderImageValues[ 5 ],

                'specularF0Value': widgetValues.sliderImageValues[ 6 ],
                'specularF0Map': widgetValues.sliderImageValues[ 8 ],

                'albedoValue': widgetValues.sliderImageValues[ 9 ],
                'albedoColor': widgetValues.sliderImageValues[ 10 ],
                'albedoMap': widgetValues.sliderImageValues[ 11 ],

                'specularValue': widgetValues.sliderImageValues[ 12 ],
                'specularColor': widgetValues.sliderImageValues[ 13 ],
                'specularMap': widgetValues.sliderImageValues[ 14 ],
            }
        },
        function pbrSpecularGlossiness( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'channelType': widgetValues.toggleButtonValues[ 0 ],

                'roughnessValue': widgetValues.sliderImageValues[ 0 ],
                'roughnessMap': widgetValues.sliderImageValues[ 2 ],

                'glossinessValue': widgetValues.sliderImageValues[ 3 ],
                'glossinessMap': widgetValues.sliderImageValues[ 5 ]
            }
        },
        function diffuse( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'diffuseValue': widgetValues.sliderImageValues[ 0 ],
                'diffuseColor': widgetValues.sliderImageValues[ 1 ],
                'diffuseMap': widgetValues.sliderImageValues[ 2 ]
            }
        },
        function specular( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'specularValue': widgetValues.sliderImageValues[ 0 ],
                'specularColor': widgetValues.sliderImageValues[ 1 ],
                'specularMap': widgetValues.sliderImageValues[ 2 ],

                'glossinessValue': widgetValues.sliderImageValues[ 3 ],
                'glossinessColor': widgetValues.sliderImageValues[ 4 ],
                'glossinessMap': widgetValues.sliderImageValues[ 5 ]
            }
        },
        function displacement( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'displacementValue': widgetValues.sliderImageValues[ 0 ],
                'displacementColor': widgetValues.sliderImageValues[ 1 ],
                'displacementMap': widgetValues.sliderImageValues[ 2 ]
            }
        },
        function normalBump( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'channelType': widgetValues.toggleButtonValues[ 0 ],
                'invertY': widgetValues.checkboxValues[ 0 ],

                'normalValue': widgetValues.sliderImageValues[ 0 ],
                'normalMap': widgetValues.sliderImageValues[ 2 ],

                'bumpValue': widgetValues.sliderImageValues[ 3 ],
                'bumpMap': widgetValues.sliderImageValues[ 5 ],
            }
        },
        function lightmap( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'lightmapValue': widgetValues.sliderImageValues[ 0 ],
                'lightmapColor': widgetValues.sliderImageValues[ 1 ],
                'lightmapMap': widgetValues.sliderImageValues[ 2 ],
            }
        },
        function pbrAO( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'AOValue': widgetValues.sliderImageValues[ 0 ],
                'AOMap': widgetValues.sliderImageValues[ 2 ],

                'occludeSpecular': widgetValues.checkboxValues[ 0 ],
            }
        },
        function pbrCavity( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'cavityValue': widgetValues.sliderImageValues[ 0 ],
                'cavityMap': widgetValues.sliderImageValues[ 2 ],
            }
        },
        function opacity( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'channelType': widgetValues.toggleButtonValues[ 0 ],

                'opacityValue': widgetValues.sliderImageValues[ 0 ],
                'opacityMap': widgetValues.sliderImageValues[ 2 ],
            }
        },
        function emissive( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'enabled': widgetValues.enabled,

                'emissiveValue': widgetValues.sliderImageValues[ 0 ],
                'emissiveColor': widgetValues.sliderImageValues[ 1 ],
                'emissiveMap': widgetValues.sliderImageValues[ 2 ],
            }
        },
        function reflection( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'reflectionValue': widgetValues.sliderValues[ 0 ],
            }
        },
        function faceCulling( $el ) {
            var widgetValues = collectWidgetValues( $el );
            return {
                'cullingValue': widgetValues.toggleButtonValues[ 0 ],
            }
        }
    ];
    var groupElements = $( '[data-panel="materials"] > .vertical-widget > .widget-wrapper > .children .group-widget' );
    var material = {};
    groupElements.each( function ( i, groupElement ) {
        if ( typeof groups[ i ] === 'function' ) {
            material[ groups[ i ].name ] = groups[ i ]( $( groupElement ) );
        }
    } );

    return material
}

function exportMaterial() {
    var material = getCurrentMaterial();
    var win = window.open( '', 'material-export' );
    win.document.write( '<pre>' + JSON.stringify( material, null, 4 ) + '</pre>' );
}

function downloadTextures() {
    var currentLocation = document.location.href;
    var texturesEndpoint = currentLocation.replace( '/edit', '/textures' ).replace( '/models', '/i/models' );
    GM_xmlhttpRequest( {
        url: texturesEndpoint,
        method: 'GET',
        onload: function ( response ) {
            var out = '';
            var data = JSON.parse( response.responseText );
            var textures = data.results;
            var name = '';
            var url = '';
            var largest = 0;
            for ( var i = 0; i < textures.length; i++ ) {
                name = textures[ i ].name;
                url = '';
                largest = 0;
                for ( var j = 0; j < textures[ i ].images.length; j++ ) {
                    if ( textures[ i ].images[ j ].width > largest ) {
                        largest = textures[ i ].images[ j ].width;
                        url = textures[ i ].images[ j ].url;
                    }
                }
                GM_download( url, name )
            }
        }
    } );
}


/**
 * Import materials
 ******************************************************************************/
function collectWidgets( $el ) {

    var out = {
        'group': [],
        'toggleButton': [],
        'checkbox': [],
        'slider': [],
        'sliderImage': []
    }

    out.group.push( new Group( $el ) );

    var typeElements = $el.find( '.togglebutton-widget' );
    typeElements.each( function ( i, element ) {
        out.toggleButton.push( new ToggleButton( $( element ) ) );
    } );

    var checkboxElements = $el.find( '.checkbox-widget' );
    checkboxElements.each( function ( i, element ) {
        out.checkbox.push( new Checkbox( $( element ) ) );
    } );

    var sliderElements = $el.find( '.numbered-slider-widget' );
    sliderElements.each( function ( i, element ) {
        if ( $( element ).parents( '.slidered-image-widget' ).length ) {
            return;
        }
        out.slider.push( new NumberSlider( $( element ) ) );
    } );

    var sliderImageElements = $el.find( '.slidered-image-widget' );
    sliderImageElements.each( function ( i, element ) {
        out.sliderImage.push( new ImageNumberSlider( $( element ) ) );
    } );

    return out;
}

function applyToWidgets( widgets, options, funcs ) {
    for ( option in options ) {
        if ( !options.hasOwnProperty( option ) ) {
            continue;
        }
        if ( !funcs.hasOwnProperty( option ) ) {
            continue;
        }
        funcs[ option ]( options[ option ] );
    }
}

function setCurrentMaterial( material ) {
    var groups = [
        function pbrMaps( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },
                "workflow": function ( value ) {
                    widgets.toggleButton[ 0 ].setValue( value );
                },

                "baseValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "baseColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "baseMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },

                "metalnessValue": function ( value ) {
                    widgets.sliderImage[ 1 ].setValue( value );
                },
                "metalnessMap": function ( value ) {
                    widgets.sliderImage[ 1 ].setTexture( value );
                },

                "specularF0Value": function ( value ) {
                    widgets.sliderImage[ 2 ].setValue( value );
                },
                "specularF0Map": function ( value ) {
                    widgets.sliderImage[ 2 ].setTexture( value );
                },

                "albedoValue": function ( value ) {
                    widgets.sliderImage[ 3 ].setValue( value );
                },
                "albedoColor": function ( value ) {
                    widgets.sliderImage[ 3 ].setColor( value );
                },
                "albedoMap": function ( value ) {
                    widgets.sliderImage[ 3 ].setTexture( value );
                },

                "specularValue": function ( value ) {
                    widgets.sliderImage[ 4 ].setValue( value );
                },
                "specularColor": function ( value ) {
                    widgets.sliderImage[ 4 ].setColor( value );
                },
                "specularMap": function ( value ) {
                    widgets.sliderImage[ 4 ].setTexture( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function pbrSpecularGlossiness( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "channelType": function ( value ) {
                    widgets.toggleButton[ 0 ].setValue( value );
                },

                "roughnessValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "roughnessMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },

                "glossinessValue": function ( value ) {
                    widgets.sliderImage[ 1 ].setValue( value );
                },
                "glossinessMap": function ( value ) {
                    widgets.sliderImage[ 1 ].setTexture( value );
                },
            }
            applyToWidgets( widgets, options, funcs );
        },
        function diffuse( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "diffuseValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "diffuseColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "diffuseMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },
            }
            applyToWidgets( widgets, options, funcs );
        },
        function specular( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "specularValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "specularColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "specularMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },

                "glossinessValue": function ( value ) {
                    widgets.sliderImage[ 1 ].setValue( value );
                },
                "glossinessMap": function ( value ) {
                    widgets.sliderImage[ 1 ].setTexture( value );
                },
            }
            applyToWidgets( widgets, options, funcs );
        },
        function displacement( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "displacementValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "displacementColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "displacementMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                }
            };
            applyToWidgets( widgets, options, funcs );
        },
        function normalBump( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },
                "channelType": function ( value ) {
                    widgets.toggleButton[ 0 ].setValue( value );
                },
                "invertY": function ( value ) {
                    widgets.checkbox[ 0 ].setValue( value );
                },

                "normalValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "normalMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },

                "bumpValue": function ( value ) {
                    widgets.sliderImage[ 1 ].setValue( value );
                },
                "bumpMap": function ( value ) {
                    widgets.sliderImage[ 1 ].setTexture( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function lightmap( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "lightmapValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "lightmapColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "lightmapMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function pbrAO( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },
                "occludeSpecular": function ( value ) {
                    widgets.checkbox[ 0 ].setValue( value );
                },

                "AOValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "AOMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function pbrCavity( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "cavityValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "cavityMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function opacity( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },
                "channelType": function ( value ) {
                    widgets.toggleButton[ 0 ].setValue( value );
                },

                "opacityValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "opacityMap": function ( value ) {},
            };
            applyToWidgets( widgets, options, funcs );
        },
        function emissive( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "enabled": function ( value ) {
                    value ? widgets.group[ 0 ].enable() : widgets.group[ 0 ].disable()
                },

                "emissiveValue": function ( value ) {
                    widgets.sliderImage[ 0 ].setValue( value );
                },
                "emissiveColor": function ( value ) {
                    widgets.sliderImage[ 0 ].setColor( value );
                },
                "emissiveMap": function ( value ) {
                    widgets.sliderImage[ 0 ].setTexture( value );
                },
            }
            applyToWidgets( widgets, options, funcs );
        },
        function reflection( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "reflectionValue": function ( value ) {
                    widgets.slider[ 0 ].setValue( value );
                },
            };
            applyToWidgets( widgets, options, funcs );
        },
        function faceCulling( $el, options ) {
            var widgets = collectWidgets( $el );
            var funcs = {
                "cullingValue": function ( value ) {
                    widgets.toggleButton[ 0 ].setValue( value );
                }
            };
            applyToWidgets( widgets, options, funcs );
        },
    ];

    var groupElements = $( '[data-panel="materials"] > .vertical-widget > .widget-wrapper > .children .group-widget' );
    groupElements.each( function ( i, groupElement ) {
        if ( typeof groups[ i ] === 'function' ) {
            var channelName = groups[ i ].name;
            if ( !material.hasOwnProperty( channelName ) ) {
                console.log( 'Skipped ' + channelName );
                return;
            }

            console.log( 'Applying ' + channelName );
            groups[ i ]( $( groupElement ), material[ channelName ] );

        }
    } );
}

function importMaterial() {

    var material;
    try {
        material = JSON.parse( window.prompt() );
    } catch ( e ) {
        alert( 'Material is not valid' );
        return;
    }

    if ( !material ) {
        alert( 'Material is not valid' );
        return;
    }

    setCurrentMaterial( material );
}
