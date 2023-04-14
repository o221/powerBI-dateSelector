# Date Selector Visual

## A compact rich functionality date range filter for Power BI
The [**DateSelector** visual](https://github.com/o221/powerBI-dateSelector/blob/main/dist/dateSel4A1A0033E6F54D1B809B6E51058D54E3.23.04.03.pbiviz) is a date range selector designed to be used with Microsoft Power BI.

## Features
- Allows users to select a range of dates with a compact user-friendly interface.
- Enables users to filter data based on the selected date range.
- Simple and intuitive design, easy to use.

<img width="600" alt="image" src="https://user-images.githubusercontent.com/30431819/231940537-9274dfcf-d11b-429f-9711-83d8e82b2abd.png">

***
<img width="600" alt="image" src="https://user-images.githubusercontent.com/30431819/231940772-8e7ac33c-1c9e-4bac-82ad-bd127c41696f.png">

 ***
<img width="600" alt="image" src="https://user-images.githubusercontent.com/30431819/231940898-2424246f-59a7-4458-a236-f2e3e165ee08.png">

 ***
<img width="600" alt="image" src="https://user-images.githubusercontent.com/30431819/231941191-da5e2c64-929e-4099-8b10-609981076712.png">

 ****
 
 #### Date Range Input
  * Input via field, quick action buttons or slider
     * The date entry is not limited to the filtered scope
* Up to 6 levels of granularity on the slider(s)
     * Granularity determines step size of the interactions
     * Based on granularity - Top timeline is the primary granularity
     * Shows selected range on two granularity levels (optional) 
     * Second timeline shows context - it is also active
* Optional buttons for Today, This Week, etc. with optional YTD, etc.
     * Today, etc. buttons, are hidden when the button's period is not in scope.
* Range slider shows full scope of selected date field
* Filters reduce the scope on any level - Visual/Page/All Pages

 #### Start-up state 
  * Slicer opens in configured *pre-set* state 
     * Today, YTD, etc.
     * or ...
Can be synced with last  page viewed
     * With *pre-set* range there's no sync respected on the pre-set pages.
 #### Short cut keys 
  * when slider is active use fast shortcuts
 #### Help 
  * Descriptive tooltip option

## Installation
To use the DateSelector visual, you can import it into your Power BI report by following these steps:

Download the visual from [dist](https://github.com/o221/powerBI-dateSelector/blob/main/dist/dateSel4A1A0033E6F54D1B809B6E51058D54E3.23.04.03.pbiviz) and import it into Power BI using the "Import from file" option.

1. Open the report in Power BI Desktop.
2. In the Visualizations pane, select the ellipsis (...).
3. Select "Import from file."
4. Select downloaded "DateSelector" file.
5. Click on the visual and select "Add."

## Usage
To use the DateSelector visual, add it to your report canvas and connect it to the relevant data fields. Users can then use the visual to select a date range and filter data accordingly.

## Version
The current version of the DateSelector visual is 23.04.03.

## Dependencies
The DateSelector visual does not have any dependencies.

## Support
If you encounter any issues while using the DateSelector visual, please visit the [support page](https://github.com/o221/powerBI-dateSelector/issues) for assistance.

## License
The DateSelector visual is released under the MIT License. Please refer to the LICENSE file for more information.

## Acknowledgments
We would like to thank the Power BI community for their support and feedback in the development of the DateSelector visual.
