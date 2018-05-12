import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yiq'
})
export class YiqCorrectionPipe implements PipeTransform {

    transform ( value: string, backgroundColor: string, colorOptions?: string[] ): string {

        // If no color options are provided use black and white
        if (colorOptions == null) {
            colorOptions = [];
            colorOptions.push('#000000');
            colorOptions.push('#ffffff');
        }

        // If the desired value has a YIQ value too close to the background
        // color YIQ value, try the alternatives
        if ( !this.colorVSBkgdColorYIQ(value, backgroundColor) ) {

            // If a color that works is found return the string and stop
            // the funtion
            for (let option of colorOptions) {
                if ( this.colorVSBkgdColorYIQ (value, option) ) { return option; }
            }
        }

        // If we make it here we will assume we are going to use the desired value
        // NOTE: That does not mean it works necessarily, just that no option
        // worked either
        return value;
    }


    // This function takes 2 hex color inputs (ideally a font color and a
    // background color). It finds the YIQ color space (essentially brightness)
    // values of each then compares their values to determine if the font will
    // have enough contrast to be displayed on the given background color.
    // If not the function will return white on dark backgrounds and black
    // on light backgrounds
    colorVSBkgdColorYIQ (hexColor, hexBkgdColor): boolean {

        // Arbitrarily determined values, based on opinon of how things look
        const YIQ_RATIO_TOLERANCE = 0.4;
        //const BACKGROUND_IS_DARK = 100;

        // TODO: Test for rgb() and rgba() formats

        // TODO: Handle 3 char hex values. ie: `#fff` = `#ffffff`

        // Create a YIQ value from the hex of the font color
        // Results in possible value set [ 0(dark) , 255(light)]
        let colorR = parseInt(hexColor.substr(1,2),16);
        let colorG = parseInt(hexColor.substr(3,2),16);
        let colorB = parseInt(hexColor.substr(5,2),16);
        let colorYIQ = ( (colorR*299) + (colorG*587) + (colorB*114) ) /1000;

        // Create a YIQ value from the hex of the background color
        // Results in possible value set [ 0(dark) , 255(light)]
        let bkgdColorR = parseInt(hexBkgdColor.substr(1,2),16);
        let bkgdColorG = parseInt(hexBkgdColor.substr(3,2),16);
        let bkgdColorB = parseInt(hexBkgdColor.substr(5,2),16);
        let bkgdColorYIQ = ( (bkgdColorR*299) + (bkgdColorG*587) + (bkgdColorB*114) ) /1000;

        // Create a ratio of how close together these colors are in YIQ value
        // Results in possible value set [-1 , 1]
        let ratioYIQ = (colorYIQ - bkgdColorYIQ) /255;

        // If the |YIQ ratio| is over our arbitrary tolerance level
        // return true, else false
        if (Math.abs(ratioYIQ) > YIQ_RATIO_TOLERANCE) { return true; }
        return false;
    }
}
