## 2017-07-14 - Release 0.13.0
* Skip columns where headers are not present.

## 2017-05-10 - Release 0.12.0
* Added `extractor` option.

## 2015-06-05 - Release 0.11.1
* Fixed `colspan` & `rowspan` support for complicated tables.

## 2015-02-06 - Release 0.11.0
* Added `textExtractor` option.

## 2014-11-21 - Release 0.10.0
* Added `ignoreEmptyRows` option.

## 2014-9-24 - Release 0.9.0
* Added `includeRowId` option.

## 2014-4-14 - Release 0.8.3
* Updated to correct version number.

## 2014-4-14 - Release 0.8.2
* Updated `onlyColumns` & `ignoreColumns` to work with colspans ([demo](http://jsfiddle.net/Mottie/4E2L6/10/)).

## 2014-4-13 - Release 0.8.1
* Added basic `.gitattributes` file.
* Updated `colspan` & `rowspan` support to work when applied to the same cell ([demo](http://jsfiddle.net/Mottie/4E2L6/9/)).

## 2014-4-6 - Release 0.8.0
* Added `colspan` & `rowspan` support.
* Fixed missing license banner.
* Updated Grunt plugins.
* Added more JSHint requirements and cleaned code.

## 2014-3-26 - Release 0.7.0
* Added `allowHTML` option to preserve HTML tags from table cells.
* Fixed Travis & Grunt tests.

## 2013-07-25 - Release 0.6.0
* Added `headings` option to define the headings of a table. When supplied, treats entire table as values.

## 2013-04-23 - Release 0.5.1
* Halved execution time.
* Added more JSHint requirements.

## 2013-04-15 - Release 0.5.0
* **The release breaks backwards compatibility for both option names and data-* attributes.**
* Changed option `ignoreColNum` to `ignoreColumns`.
* Merged `data-cell-value` and `data-column-name` into a single attribute: `data-override`.
* Added a new option `onlyColumns` to set which columns are included and ignores all others.

## 2013-04-12 - Release 0.4.0
* No longer requires the use of `th` elements - always uses the first row as column names.

## 2013-02-15 - Release 0.3.0
* Added tests and fixed many bugs.
