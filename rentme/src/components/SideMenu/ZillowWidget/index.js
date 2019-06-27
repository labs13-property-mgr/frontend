import React from "react";

const ZillowWidget = () => {
    return (
        <>
          <div id="zillow-large-search-box-widget-container" 
            style={{width: '239px', overflow: 'hidden', backgroundColor: '#e7f1fd', 
            color: '#555', font: 'normal normal normal 13px verdana,arial,sans-serif', 
            lineHeight: '13px', margin: '0 auto', padding: 0, textAlign: 'center', 
            border: '1px solid #adcfff', letterSpacing: 0, textTransform: 'none'}}>
              <h2 style={{color: '#d61', textAlign: 'left', fontSize: '18px', 
                lineHeight: '20px', fontWeight: 'normal', float: 'left', width: '125px', 
                marginLeft: '10px', marginTop: '5px', letterSpacing: 0, textTransform: 'none'}}>Property Info</h2>
                  <div style={{float: 'right'}}>
                    <a href="https://www.zillow.com/" target="_blank" rel="nofollow">
                      <img alt="Zillow Real Estate Information" style={{border: 0}} 
                        src="https://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/images/powered-by-zillow.gif" />
                    </a>
                  </div>
                  <iframe scrolling="no" 
                    src="https://www.zillow.com/widgets/search/LargeSearchBoxWidget.htm?did=zillow-large-search-box-iframe-widget&type=iframe&rgname=Seattle+WA&shvi=no" 
                    width={198} height={50} frameBorder={0} />
          </div>
        </>
    )
}

export default ZillowWidget;