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