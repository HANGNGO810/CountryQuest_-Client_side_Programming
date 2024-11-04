# CLIENT-SIDE JAVASCRIPT PROGRAMMING

Phase 1: Wireframe and storyboard designs for the main web page, plus necessary page for the Wikipedia lookup of each country. 
Phase 2: Basic web page design implemented to the point that the main web page with the country form launches and the other page (wiki) can be launched by clicking on the appropriate item on the main page. Demonstrate pseudocode for handling data flow between JSON file and application to support phase 3 functionality.
Phase 3: The major functionality of the Countries of the World web page completed, including: the loading of the list of countries, the appropriate information shown when selecting a country including its flag image, and the ability to switch the output between kilometers and miles. The Wikipedia lookup page is completely working.
Phase 4:  Wireframe and storyboard designs for the quiz web page. Demonstrate pseudocode for quiz and high score to support bonus functionality. The complete functionality of the Flags of the World Quiz web page working along with high scores.

Create a dynamic HTML5 website that displays information about any country the user selects from a list.
For any country selected, the application will display the following data:
•	Name of the country
•	An image of the country’s flag
•	The population of the country
•	The country’s total area, shown in sq. miles (by default) or sq. kilometres, according to user preference
•	The country’s population density per square mile (by default) or square KM, according to user preference
•	The country’s percentage of the total world population
The country data being displayed will change automatically whenever a new country is selected from the list.
On the display for each country a button will be presented to launch a second web page, which will load the Wikipedia entry for the selected country. 

Another dialog window can be launched via another button/link, which will present a Countries of the World flag quiz in a new web page. 
This quiz will randomly show a country’s flag, present a drop-down with the correct country and three other random country choices, 
and allow the user to proceed through a quiz of 10 questions. Once complete, the user will be shown their quiz score. If it qualifies 
as a top-5 high score, they will be prompted for a high score username to be recorded. Finally, the all-time high scores list will be shown.

PROGRAM FUNCTIONALITY
When the application starts, the main form of the web page will be mostly blank. To start, the user will be shown only a list of the country names in a select box populated from the countries.json file. Once the user selects any country from the list, the main form display area will show information specific to the selected country, as detailed above.
In addition to displaying the country’s flag and basic demographics, the webpage should include a dropdown list to allow users to change the Total Area display from its default setting of square miles to square kilometres. When this occurs, the “Population Density per” output should be updated to show the current user preference, and the country’s population density should change to reflect the value in the chosen unit of measure.
Users will be able to press a “Wiki Country” button at the bottom of each country’s display that will launch a new webpage that will load and display the Wikipedia page for that particular country. This should open in a new tab so that the user can easily return to the main web page.

The user will be allowed to launch another web page via a link or button on the main page, which will present a Flags quiz in the same tab
as the original page. This quiz will randomly show a country’s flag, present a drop-down with the correct country and three other random
country names, shown in random order, and allow the user to submit their choice. The user will be immediately informed of their updated 
score after each guess via a score progress output on the page. The user will be taken through a quiz of 10 questions, and will have 
buttons to cancel (and close) or restart the quiz at any time.

Once the last quiz question is answered, the user’s final quiz score will be calculated and displayed on screen. Their score will be 
evaluated to see if it is a new high score, through a comparison to values originally loaded from the high scores.json file, but later 
updated and maintained in HTML5 local storage in the web browser. If the final score qualifies as a top-5 high score, the user will be 
prompted to enter their three-letter (e.g. MHC) username, which will be saved as a new high score in local storage. Only the five highest
scores are saved, so a new entry will effectively bump the lowest off of the list. The score must be higher than one of the previous 
entries, so earlier scores “win” in case of a tie (ie. the first 10/10 will be the highest score forever). 

The username, score, and timestamp will be saved to local storage in the format indicated in the high_scores.json file. Do not forget to drop the lowest 
score if there is a new entry as we only store 5 highest scores. Regardless of whether there is a new entry or not, the highest scores
will then be displayed to the user in a well formatted way, in the area of the web page near the section for guessing a country.
The user will still have buttons at the bottom of the page to either cancel (ie. Close) the web page and return to the main page or
restart the quiz.
