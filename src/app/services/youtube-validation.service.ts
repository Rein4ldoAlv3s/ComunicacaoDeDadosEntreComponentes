import {Injectable} from '@angular/core';

//Convert any YouTube link to part of an embed, like: https://youtu.be/wchOkp8lmWg ==> wchOkp8lmWg
//Use the method transformYoutubeLinks to convert
@Injectable({providedIn: 'root'})
export class YoutubeValidationService {

  convertToYoutubeLink : string;
  convertToEmbed : string;

    constructor() {}



    createYoutubeEmbed = (key : string) => {
        return key;
    };

    transformYoutubeLinks = (text : string) => {
        if (!text) 
            return text;
        


        const self = this;

        const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
        const fullreg = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

        let resultHtml = text;

        // get all the matches for youtube links using the first regex
        const match = text.match(fullreg);
        if (match && match.length > 0) { // get all links and put in placeholders
            const matchlinks = text.match(linkreg);
            if (matchlinks && matchlinks.length > 0) {
                for (var i = 0; i < matchlinks.length; i++) {
                    resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
                }
            }

            // now go through the matches one by one
            for (var i = 0; i < match.length; i++) { // get the key out of the match using the second regex
                let matchParts = match[i].split(regex);
                // replace the full match with the embedded youtube code
                resultHtml = resultHtml.replace(match[i], self.createYoutubeEmbed(matchParts[1]));
            }

            // ok now put our links back where the placeholders were.
            if (matchlinks && matchlinks.length > 0) {
                for (var i = 0; i < matchlinks.length; i++) {
                    resultHtml = resultHtml.replace("#placeholder" + i + "#", matchlinks[i]);
                }
            }
        }
        return resultHtml;
    };
}
