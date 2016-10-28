function initializePostProcessing() {
    console.info( 'Initializing post-processing extensions' );

    var postProcessGroupReady = false;
    observeDOM( document.body, function () {
        var postProcessGroup = $( '#PostProcessGroup' );
        if ( postProcessGroup.length ) {

            if ( postProcessGroupReady === false ) {
                onPostProcessReady();
                postProcessGroupReady = true;
            }

        }
    } );
}

/**
 * Presets
 ******************************************************************************/

function buildPresets() {

    // Default Presets
    var presets = [

            // No Filters
            {
                "name": "No Filters",
                "settings": {
                    "grain": {
                        "enable": false,
                        "amount": 0,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": false,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": false,
                        "factor": 0
                    },
                    "chromaticAberration": {
                        "enable": false,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": false,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": false,
                        "threshold": 0,
                        "factor": 0,
                        "radius": 0
                    },
                    "toneMapping": {
                        "enable": false,
                        "method": "linear",
                        "exposure": 0,
                        "brightness": 0,
                        "contrast": 0,
                        "saturation": 0
                    },
                    "colorBalance": {
                        "enable": false,
                        "low": [ 0, 0, 0 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 0, 0, 0 ],
                    }
                }
            },
            //Flat
            {
                "name": "Flat",
                "settings": {
                    "grain": {
                        "enable": true,
                        "amount": 0,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": true,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": true,
                        "factor": 0
                    },
                    "chromaticAberration": {
                        "enable": true,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": true,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": true,
                        "threshold": 0,
                        "factor": 0,
                        "radius": 0
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "linear",
                        "exposure": 0,
                        "brightness": 0,
                        "contrast": 0,
                        "saturation": 0
                    },
                    "colorBalance": {
                        "enable": true,
                        "low": [ 0, 0, 0 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 0, 0, 0 ],
                    }
                }
            },

            // 3D scan enhance
            {
                "name": "3D Scan Enhance",
                "settings": {
                    "grain": {
                        "enable": false,
                        "amount": 0,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": false,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": true,
                        "factor": 20
                    },
                    "chromaticAberration": {
                        "enable": false,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": false,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": false,
                        "threshold": 0,
                        "factor": 0,
                        "radius": 0
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "linear",
                        "exposure": 10,
                        "brightness": 10,
                        "contrast": 30,
                        "saturation": 20
                    },
                    "colorBalance": {
                        "enable": false,
                        "low": [ 0, 0, 0 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 0, 0, 0 ],
                    }
                }
            },

            // Black & white
            {
                "name": "Black & White",
                "settings": {
                    "grain": {
                        "enable": true,
                        "amount": 30,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": false,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": false,
                        "factor": 0
                    },
                    "chromaticAberration": {
                        "enable": false,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": false,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": false,
                        "threshold": 0,
                        "factor": 0,
                        "radius": 0
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "filmic",
                        "exposure": 0,
                        "brightness": 0,
                        "contrast": 0,
                        "saturation": -100
                    },
                    "colorBalance": {
                        "enable": false,
                        "low": [ 0, 0, 0 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 0, 0, 0 ],
                    }
                }
            },

            // Vintage
            {
                "name": "Vintage",
                "settings": {
                    "grain": {
                        "enable": true,
                        "amount": 30,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": false,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": false,
                        "factor": 0
                    },
                    "chromaticAberration": {
                        "enable": false,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": true,
                        "amount": 35,
                        "hardness": 90
                    },
                    "bloom": {
                        "enable": true,
                        "threshold": 100,
                        "factor": 10,
                        "radius": 100
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "reinhard",
                        "exposure": 0,
                        "brightness": 50,
                        "contrast": -30,
                        "saturation": -60
                    },
                    "colorBalance": {
                        "enable": true,
                        "low": [ 0, 0, -2 ],
                        "mid": [ 40, 0, -20 ],
                        "high": [ 0, 0, -30 ],
                    }
                }
            },

            // The Matrix
            {
                "name": "The Matrix",
                "settings": {
                    "grain": {
                        "enable": false,
                        "amount": 0,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": true,
                        "foregroundBlur": 100,
                        "backgroundBlur": 100
                    },
                    "sharpen": {
                        "enable": true,
                        "factor": 30
                    },
                    "chromaticAberration": {
                        "enable": true,
                        "factor": 100
                    },
                    "vignette": {
                        "enable": true,
                        "amount": 35,
                        "hardness": 90
                    },
                    "bloom": {
                        "enable": true,
                        "threshold": 100,
                        "factor": 10,
                        "radius": 100
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "linear",
                        "exposure": 30,
                        "brightness": 0,
                        "contrast": 0,
                        "saturation": 30
                    },
                    "colorBalance": {
                        "enable": true,
                        "low": [ 0, 100, 0 ],
                        "mid": [ 0, 100, 0 ],
                        "high": [ 0, 100, 0 ],
                    }
                }
            },

            // Hollywood
            {
                "name": "Hollywood",
                "settings": {
                    "grain": {
                        "enable": true,
                        "amount": 15,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": true,
                        "foregroundBlur": 50,
                        "backgroundBlur": 50
                    },
                    "sharpen": {
                        "enable": true,
                        "factor": 20
                    },
                    "chromaticAberration": {
                        "enable": true,
                        "factor": 10
                    },
                    "vignette": {
                        "enable": true,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": true,
                        "threshold": 10,
                        "factor": 20,
                        "radius": 50
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "filmic",
                        "exposure": 20,
                        "brightness": 0,
                        "contrast": 20,
                        "saturation": 20
                    },
                    "colorBalance": {
                        "enable": true,
                        "low": [ -1, -0.6, 0 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 30, 15, -10 ],
                    }
                }
            },

            // Washed out
            {
                "name": "Washed Out",
                "settings": {
                    "grain": {
                        "enable": true,
                        "amount": 30,
                        "isAnimated": false
                    },
                    "dof": {
                        "enable": false,
                        "foregroundBlur": 0,
                        "backgroundBlur": 0
                    },
                    "sharpen": {
                        "enable": false,
                        "factor": 0
                    },
                    "chromaticAberration": {
                        "enable": false,
                        "factor": 0
                    },
                    "vignette": {
                        "enable": false,
                        "amount": 0,
                        "hardness": 0
                    },
                    "bloom": {
                        "enable": false,
                        "threshold": 0,
                        "factor": 0,
                        "radius": 0
                    },
                    "toneMapping": {
                        "enable": true,
                        "method": "reinhard",
                        "exposure": 0,
                        "brightness": 100,
                        "contrast": -65,
                        "saturation": -60
                    },
                    "colorBalance": {
                        "enable": true,
                        "low": [ -0.5, -0.5, 2 ],
                        "mid": [ 0, 0, 0 ],
                        "high": [ 0, 0, 0 ],
                    }
                }
            }
        ],

        // Stored presets
        userValues = GM_listValues();

    if ( userValues.length ) {
        for ( var i = 0; i < userValues.length; i++ ) {
            var presetName = userValues[ i ];
            presets.push( JSON.parse( GM_getValue( presetName ) ) );
        }
    }

    return presets;
}

// Delete GM values
function deletePreset() {

    var keys = GM_listValues(),
        preset = $( 'select[name="presets"] option:selected' ).text();

    if ( keys.indexOf( preset ) != -1 ) {
        GM_deleteValue( preset );
        loadPresets();
    } else {
        console.log( 'preset name mismatch during delete' );
    }
}

function exportPreset() {
    var presets = buildPresets(),
        preset = $( 'select[name="presets"] option:selected' ).text();

    for ( var i = 0; i < presets.length; i++ ) {
        if ( presets[ i ].name == preset ) {
            prompt( 'Preset JSON:', JSON.stringify( presets[ i ] ) );
            break;
        }
    }
}

function importPreset() {
    var preset = prompt( 'Preset JSON?' ),
        presetOBJ = JSON.parse( preset );

    if ( presetOBJ.hasOwnProperty( 'name' ) && presetOBJ.hasOwnProperty( 'settings' ) ) {
        GM_setValue( presetOBJ.name, preset );
        loadPresets();
    } else {
        console.log( 'preset not formatted correctly' );
    }

}

function applyPreset( index ) {

    var presets = buildPresets(),
        preset = presets[ index ].settings;

    $widgets = $( '#PostProcessGroup > .widget-wrapper > .inner > .vertical-widget > .widget-wrapper > .children > .widget' );
    var filters = {
        'grain': 0,
        'dof': 1,
        'sharpen': 2,
        'chromaticAberration': 3,
        'vignette': 4,
        'bloom': 5,
        'toneMapping': 6,
        'colorBalance': 7
    }

    $widgets.each( function ( index ) {
        switch ( index ) {
        case filters.grain:
            grain( $( this ), preset.grain.enable, preset.grain.amount, preset.grain.isAnimated );
            break;
        case filters.dof:
            dof( $( this ).find( '.group-widget' ), preset.dof.enable, preset.dof.foregroundBlur, preset.dof.backgroundBlur );
            break;
        case filters.sharpen:
            sharpen( $( this ), preset.sharpen.enable, preset.sharpen.factor );
            break;
        case filters.chromaticAberration:
            chromaticAberration( $( this ), preset.chromaticAberration.enable, preset.chromaticAberration.factor );
            break;
        case filters.vignette:
            vignette( $( this ), preset.vignette.enable, preset.vignette.amount, preset.vignette.hardness );
            break;
        case filters.bloom:
            bloom( $( this ), preset.bloom.enable, preset.bloom.threshold, preset.bloom.factor, preset.bloom.radius );
            break;
        case filters.toneMapping:
            toneMapping( $( this ), preset.toneMapping.enable, preset.toneMapping.method, preset.toneMapping.exposure, preset.toneMapping.brightness, preset.toneMapping.contrast, preset.toneMapping.saturation );
            break;
        case filters.colorBalance:
            colorBalance( $( this ), preset.colorBalance.enable, preset.colorBalance.low, preset.colorBalance.mid, preset.colorBalance.high );
        }
    } );
}


/**
 *
 ******************************************************************************/
function grain( groupWidget, isEnabled, amount, isAnimated ) {
    isEnabled = Boolean( isEnabled );
    amount = clamp( amount, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    var isAnimatedCheckbox = new Checkbox( groupWidget.find( '.checkbox-widget' ) );
    isAnimatedCheckbox.setValue( isAnimated );
    setValueNumberedSlider( groupWidget.find( '.numbered-slider-widget' ), amount );
}

function dof( groupWidget, isEnabled, foregroundBlur, backgroundBlur ) {
    isEnabled = Boolean( isEnabled );
    foregroundBlur = clamp( foregroundBlur, 0, 100 );
    backgroundBlur = clamp( backgroundBlur, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    sliders = groupWidget.find( '.numbered-slider-widget' );
    setValueNumberedSlider( $( sliders[ 0 ] ), foregroundBlur );
    setValueNumberedSlider( $( sliders[ 1 ] ), backgroundBlur );
}

function sharpen( groupWidget, isEnabled, factor ) {

    isEnabled = Boolean( isEnabled );
    factor = clamp( factor, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    setValueNumberedSlider( groupWidget.find( '.numbered-slider-widget' ), factor );
}

function chromaticAberration( groupWidget, isEnabled, factor ) {

    isEnabled = Boolean( isEnabled );
    factor = clamp( factor, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    setValueNumberedSlider( groupWidget.find( '.numbered-slider-widget' ), factor );
}

function vignette( groupWidget, isEnabled, amount, hardness ) {

    isEnabled = Boolean( isEnabled );
    amount = clamp( amount, 0, 100 );
    hardness = clamp( hardness, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    sliders = groupWidget.find( '.numbered-slider-widget' );
    setValueNumberedSlider( $( sliders[ 0 ] ), amount );
    setValueNumberedSlider( $( sliders[ 1 ] ), hardness );
}

function bloom( groupWidget, isEnabled, threshold, intensity, radius ) {

    isEnabled = Boolean( isEnabled );
    threshold = clamp( threshold, 0, 100 );
    intensity = clamp( intensity, 0, 100 );
    radius = clamp( radius, 0, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    sliders = groupWidget.find( '.numbered-slider-widget' );
    setValueNumberedSlider( $( sliders[ 0 ] ), threshold );
    setValueNumberedSlider( $( sliders[ 1 ] ), intensity );
    setValueNumberedSlider( $( sliders[ 2 ] ), radius );
}

function toneMapping( groupWidget, isEnabled, type, exposure, brightness, contrast, saturation ) {

    isEnabled = Boolean( isEnabled );
    exposure = clamp( exposure, -100, 100 );
    brightness = clamp( brightness, -100, 100 );
    contrast = clamp( contrast, -100, 100 );
    saturation = clamp( saturation, -100, 100 );

    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    var buttons = groupWidget.find( '.togglebutton-widget li[title]' );
    switch ( type ) {
    case 'linear':
        $( buttons[ 0 ] ).trigger( 'click' );
        break;
    case 'reinhard':
        $( buttons[ 1 ] ).trigger( 'click' );
        break;
    case 'filmic':
        $( buttons[ 2 ] ).trigger( 'click' );
        break;
    }

    sliders = groupWidget.find( '.numbered-slider-widget' );
    setValueNumberedSlider( $( sliders[ 0 ] ), exposure );
    setValueNumberedSlider( $( sliders[ 1 ] ), brightness );
    setValueNumberedSlider( $( sliders[ 2 ] ), contrast );
    setValueNumberedSlider( $( sliders[ 3 ] ), saturation );
}

function colorBalance( groupWidget, isEnabled, low, mid, high ) {

    isEnabled = Boolean( isEnabled );
    if ( isEnabled ) {
        enableGroup( groupWidget );
    } else {
        disableGroup( groupWidget );
    }

    var buttons = groupWidget.find( '.togglebutton-widget li[title]' );

    $( buttons[ 0 ] ).trigger( 'click' );
    sliders = groupWidget.find( '.numbered-slider-widget' );
    setValueNumberedSlider( $( sliders[ 0 ] ), low[ 0 ] );
    setValueNumberedSlider( $( sliders[ 1 ] ), low[ 1 ] );
    setValueNumberedSlider( $( sliders[ 2 ] ), low[ 2 ] );

    $( buttons[ 1 ] ).trigger( 'click' );
    setValueNumberedSlider( $( sliders[ 0 ] ), mid[ 0 ] );
    setValueNumberedSlider( $( sliders[ 1 ] ), mid[ 1 ] );
    setValueNumberedSlider( $( sliders[ 2 ] ), mid[ 2 ] );

    $( buttons[ 2 ] ).trigger( 'click' );
    setValueNumberedSlider( $( sliders[ 0 ] ), high[ 0 ] );
    setValueNumberedSlider( $( sliders[ 1 ] ), high[ 1 ] );
    setValueNumberedSlider( $( sliders[ 2 ] ), high[ 2 ] );
}

/**
 * Get data from widgets
 ******************************************************************************/

function getPreset() {
    var preset = {};
    var filters = {
        'grain': 0,
        'dof': 1,
        'sharpen': 2,
        'chromaticAberration': 3,
        'vignette': 4,
        'bloom': 5,
        'toneMapping': 6,
        'colorBalance': 7
    }
    $widgets = $( '#PostProcessGroup > .widget-wrapper > .inner > .vertical-widget > .widget-wrapper > .children > .widget' );
    $widgets.each( function ( index ) {
        switch ( index ) {
        case filters.grain:
            preset.grain = getGrain( $( this ) );
            break;
        case filters.dof:
            preset.dof = getDof( $( this ).find( '.group-widget' ) );
            break;
        case filters.sharpen:
            preset.sharpen = getSharpen( $( this ) );
            break;
        case filters.chromaticAberration:
            preset.chromaticAberration = getChromaticAberration( $( this ) );
            break;
        case filters.vignette:
            preset.vignette = getVignette( $( this ) );
            break;
        case filters.bloom:
            preset.bloom = getBloom( $( this ) );
            break;
        case filters.toneMapping:
            preset.toneMapping = getToneMapping( $( this ) );
            break;
        case filters.colorBalance:
            preset.colorBalance = getColorBalance( $( this ) );
        }
    } );

    return preset;
}

function savePreset() {
    var newPresetName = prompt( 'new preset name?' ),
        preset = {
            "name": newPresetName,
            "settings": getPreset()
        };

    GM_setValue( newPresetName, JSON.stringify( preset ) );
    loadPresets();
}

function getTypeValue( groupWidget ) {
    var active = groupWidget.find( '.togglebutton-widget .option.active' );
    var values = {
        'default': 'linear',
        'reinhard': 'reinhard',
        'filmic': 'filmic'
    };
    return values[ active.attr( 'data-value' ) ];
}

function getGrain( groupWidget ) {
    var isAnimatedCheckbox = new Checkbox( groupWidget.find( '.checkbox-widget' ) );
    return {
        enable: isGroupEnabled( groupWidget ),
        amount: getSliderValue( groupWidget.find( '.numbered-slider-widget' ) ),
        isAnimated: isAnimatedCheckbox.isChecked()
    }
}

function getDof( groupWidget ) {
    var sliders = groupWidget.find( '.numbered-slider-widget' );
    return {
        enable: isGroupEnabled( groupWidget ),
        foregroundBlur: getSliderValue( $( sliders[ 0 ] ) ),
        backgroundBlur: getSliderValue( $( sliders[ 1 ] ) )
    }
}

function getSharpen( groupWidget ) {
    return {
        enable: isGroupEnabled( groupWidget ),
        factor: getSliderValue( groupWidget.find( '.numbered-slider-widget' ) )
    };
}

function getChromaticAberration( groupWidget ) {
    return {
        enable: isGroupEnabled( groupWidget ),
        factor: getSliderValue( groupWidget.find( '.numbered-slider-widget' ) )
    };
}

function getVignette( groupWidget ) {
    var sliders = groupWidget.find( '.numbered-slider-widget' );
    return {
        enable: isGroupEnabled( groupWidget ),
        amount: getSliderValue( $( sliders[ 0 ] ) ),
        hardness: getSliderValue( $( sliders[ 1 ] ) )
    };
}

function getBloom( groupWidget ) {
    var sliders = groupWidget.find( '.numbered-slider-widget' );
    return {
        enable: isGroupEnabled( groupWidget ),
        threshold: getSliderValue( $( sliders[ 0 ] ) ),
        intensity: getSliderValue( $( sliders[ 1 ] ) ),
        radius: getSliderValue( $( sliders[ 2 ] ) )
    };
}

function getToneMapping( groupWidget ) {
    var sliders = groupWidget.find( '.numbered-slider-widget' );
    return {
        enable: isGroupEnabled( groupWidget ),
        type: getTypeValue( groupWidget ),
        exposure: getSliderValue( $( sliders[ 0 ] ) ),
        brightness: getSliderValue( $( sliders[ 1 ] ) ),
        contrast: getSliderValue( $( sliders[ 2 ] ) ),
        saturation: getSliderValue( $( sliders[ 3 ] ) ),
    };
}

function getColorBalance( groupWidget ) {
    var sliders = groupWidget.find( '.numbered-slider-widget' );
    var buttons = groupWidget.find( '.togglebutton-widget li[title]' );
    $( buttons[ 0 ] ).trigger( 'click' );
    var low = [
        getSliderValue( $( sliders[ 0 ] ) ),
        getSliderValue( $( sliders[ 1 ] ) ),
        getSliderValue( $( sliders[ 2 ] ) )
    ];
    $( buttons[ 1 ] ).trigger( 'click' );
    var mid = [
        getSliderValue( $( sliders[ 0 ] ) ),
        getSliderValue( $( sliders[ 1 ] ) ),
        getSliderValue( $( sliders[ 2 ] ) )
    ];
    $( buttons[ 2 ] ).trigger( 'click' );
    var high = [
        getSliderValue( $( sliders[ 0 ] ) ),
        getSliderValue( $( sliders[ 1 ] ) ),
        getSliderValue( $( sliders[ 2 ] ) )
    ];

    return {
        enable: isGroupEnabled( groupWidget ),
        low: low,
        mid: mid,
        high: high
    };
}



/**
 * Extras injection
 ******************************************************************************/

function onPostProcessReady() {
    $container = $( '#PostProcessGroup > .widget-wrapper > .inner' );

    $container.prepend( [
        '<div style="padding: 5px 0">',
        '<select name="presets" style="width: Calc(60% + 5px);">',
        '</select>',
        '</div>',
        '<button style="margin-bottom: 5px; margin-right: 5px; width: 30%" class="button btn-primary btn-medium" id="savePreset" type="button">Save</button>',
        '<button style="margin-bottom: 5px; margin-right: 5px; width: 30%" class="button btn-danger btn-medium" id="deletePreset" type="button">Delete</button>',
        '<br>',
        '<button style="margin-bottom: 15px; margin-right: 5px; width: 30%" class="button btn-medium" id="exportPreset" type="button">Export</button>',
        '<button style="margin-bottom: 15px; margin-right: 5px; width: 30%" class="button btn-medium" id="importPreset" type="button">Import</button>'
    ].join( '' ) );

    $presetDropdown = $( 'select[name="presets"]' );
    loadPresets();

    $saveButton = $( '#savePreset' );
    $saveButton.on( 'click', savePreset );

    $deleteButton = $( '#deletePreset' );
    $deleteButton.on( 'click', deletePreset );

    $exportButton = $( '#exportPreset' );
    $exportButton.on( 'click', exportPreset );

    $importButton = $( '#importPreset' );
    $importButton.on( 'click', importPreset );

    $container.on( 'change', 'select', function ( e ) {
        var value = $( e.currentTarget ).val();
        if ( value !== '' ) {
            applyPreset( parseInt( value, 10 ) );
        }
    } );

    console.log( "Current filters:", getPreset() );
}

function loadPresets() {
    var presets = buildPresets();
    $presetDropdown.empty();
    $presetDropdown.append( '<option value="">Select preset</option>' );
    for ( var i = 0; i < presets.length; i++ ) {
        $presetDropdown.append( '<option value="' + i + '">' + presets[ i ].name + '</option>' );
    }
}
