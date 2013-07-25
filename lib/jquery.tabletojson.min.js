/**
 * tabletojson
 * jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
 *
 * @author Daniel White
 * @copyright Daniel White 2013
 * @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/table-to-json
 * @module tabletojson
 * @version 0.6.0
 */
(function(e){e.fn.tableToJSON=function(t){var n={ignoreColumns:[],onlyColumns:null,ignoreHiddenRows:!0,headings:null};t=e.extend(n,t);var r=function(e){return e!==undefined&&e!==null?!0:!1},i=function(n){return r(t.onlyColumns)?e.inArray(n,t.onlyColumns)===-1:e.inArray(n,t.ignoreColumns)!==-1},s=function(t,n){var r={};return e.each(n,function(e,n){e<t.length&&(r[t[e]]=n)}),r},o=function(t){var n=[];return e(t).children("td,th").each(function(t,s){if(!i(t)){var o=e(s).data("override"),u=e.trim(e(s).text());n[n.length]=r(o)?o:u}}),n},u=function(e){var n=e.find("tr:first").first();return r(t.headings)?t.headings:o(n)},a=function(n,i){var u=[];return n.children("tbody,*").children("tr").each(function(n,a){if(n!==0||r(t.headings))if(e(a).is(":visible")||!t.ignoreHiddenRows)u[u.length]=s(i,o(a))}),u},f=u(this);return a(this,f)}})(jQuery);