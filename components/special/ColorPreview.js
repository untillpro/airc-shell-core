import React from 'react';
import conv from 'color-shorthand-hex-to-six-digit';

const ColorPreview = (props) => {
    console.log(`#${props.color}`);
    console.log(conv(`#${props.color}`));
    return (
        <div 
            className={`
                color-preview
                ${props.showValue ? 'value-preview' : ''}
                ${props.square ? 'square' : ''}
            `}
        >
            {props.showValue ? ( 
                <div className="color-preview-value">
                    {conv(`#${props.color}`)}
                </div>
            ) : null}

            <div 
                className="color-preview-color"

                style={{
                    backgroundColor: `#${String(props.color).toUpperCase() || 'FFFFFF'}`
                }}
            />
        </div>
            
    );
};

export default ColorPreview