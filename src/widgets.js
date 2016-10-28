/**
 * Widgets manipulation
 ******************************************************************************/

function Group( $el ) {
    this.$el = $el;
}
Group.prototype.getName = function () {
    return this.$el.children( '.widget-wrapper' ).children( '.header' ).children( '.label' ).text();
}
Group.prototype.isEnabled = function () {
    return this.$el.hasClass( 'active' );
};
Group.prototype.enable = function () {
    if ( !this.isEnabled() ) {
        this.$el.find( '.state' ).trigger( 'click' );
    }
};
Group.prototype.disable = function () {
    if ( this.isEnabled() ) {
        this.$el.find( '.state' ).trigger( 'click' );
    }
};

function NumberSlider( $el ) {
    this.$el = $el;
}
NumberSlider.prototype.getValue = function () {
    return this.$el.find( '.number-widget input.value' ).val();
}
NumberSlider.prototype.setValue = function ( value ) {
    this.$el.find( '.number-widget input.value' ).val( value ).trigger( 'change' );
}

function ImageNumberSlider( $el ) {
    this.$el = $el;
}
extend( ImageNumberSlider, NumberSlider );
ImageNumberSlider.prototype.getColor = function () {
    return this.$el.find( '.selectbox .panels .panel:last-child .value' ).val();
}
ImageNumberSlider.prototype.setColor = function ( rgbString ) {
    if ( rgbString.length < 6 ) {
        return;
    }
    if ( rgbString.indexOf( '#' ) === -1 ) {
        rgbString = '#' + rgbString;
    }
    rgbString = rgbString.toUpperCase();
    this.$el.find( '.selectbox .panels .panel:last-child .value' ).val( rgbString ).trigger( 'change' );
}
ImageNumberSlider.prototype.getTexture = function () {
    var texture = this.$el.find( '.selectbox .select-widget .selection' ).attr( 'title' );
    if ( texture && texture !== 'Choose texture' ) {
        return texture;
    } else {
        return undefined;
    }
}
ImageNumberSlider.prototype.setTexture = function ( name ) {
    var textureElements = this.$el.find( '.selectbox .select-widget .options .option' );
    console.log( textureElements.length );
    textureElements.each( function ( i, el ) {
        if ( name === $( el ).attr( 'title' ) ) {
            console.log( name );
            $( el ).trigger( 'click' );
        }
    } );
}

function enableGroup( group ) {
    if ( !group.hasClass( 'active' ) ) {
        group.find( '.state' ).trigger( 'click' );
    }
}

function ToggleButton( $el ) {
    this.$el = $el;
}
ToggleButton.prototype.getValue = function () {
    var $active = this.$el.find( '.option.active' );
    return $active.attr( 'data-value' );
}
ToggleButton.prototype.getValues = function () {
    var values = []
    $.map( this.$el.find( '.option' ), function ( el, i ) {
        values.push( $( el ).attr( 'data-value' ) );
    } );
    return values;
}
ToggleButton.prototype.setValue = function ( value ) {
    if ( this.getValue() !== String( value ) ) {
        this.$el.find( '.option[data-value="' + value + '"]' ).trigger( 'click' );
    }
}

function Checkbox( $el ) {
    this.$el = $el;
}
Checkbox.prototype.isChecked = function () {
    var value = this.$el.hasClass( 'active' );
    return value;
}
Checkbox.prototype.check = function () {
    if ( !this.isChecked() ) {
        this.$el.find( '.state' ).trigger( 'click' );
    }
}
Checkbox.prototype.uncheck = function () {
    if ( this.isChecked() ) {
        this.$el.find( '.state' ).trigger( 'click' );
    }
}
Checkbox.prototype.setValue = function ( checked ) {
    checked = !!checked;
    if ( checked ) {
        this.check();
    } else {
        this.uncheck();
    }
}

function disableGroup( group ) {
    if ( group.hasClass( 'active' ) ) {
        group.find( '.state' ).trigger( 'click' );
    }
}

function setValueNumberedSlider( numberedSlider, value ) {
    var $input = numberedSlider.find( 'input.value' );
    $input.val( value ).trigger( 'change' );
}

function clamp( value, min, max ) {
    if ( value < min ) {
        return min;
    }
    if ( value > max ) {
        return max;
    }
    return value;
}

function isGroupEnabled( groupWidget ) {
    return groupWidget.hasClass( 'active' );
}

function getSliderValue( numberedSlider ) {
    return numberedSlider.find( 'input.value' ).val();
}
