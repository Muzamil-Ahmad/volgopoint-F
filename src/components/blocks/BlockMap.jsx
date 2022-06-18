// react
import React from 'react';

export default function BlockMap() {
    return (
        <div className="block-map block">
            <div className="block-map__body">
                <iframe
                    title="Google Map"
                    src="https://maps.google.com/maps?q=113 Barnum street Westbabylon New York-11704%20&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                />
            </div>
        </div>
    );
}
