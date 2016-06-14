"use strict";angular.module("inspinia",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","highcharts-ng","ui.select","angular-venn"]).config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("index",{"abstract":!0,url:"/index",templateUrl:"components/common/content.html"}).state("index.main",{url:"/main",templateUrl:"app/main/main.html",data:{pageTitle:"Example view"}}).state("index.minor",{url:"/minor",templateUrl:"app/minor/minor.html",data:{pageTitle:"Example view"}}),e.otherwise("/index/main")}]),angular.module("inspinia").controller("TabsDemoCtrl",["$scope","$window",function(t){t.tabs=[{title:"Global",content:"Dynamic content 1"},{title:"China",content:"Dynamic content 2",disabled:!0}],t.click=function(){$rootScope.$broadcast("redraw")}}]),angular.module("inspinia").controller("VeenCtrl",["$scope","$http",function(t,e){t.loadData=function(a){e.get("getDataFromFile?file="+a).success(function(e){e=e.data;var a=[{sets:["China_FX"],size:e.China_FX_FC_SC_TU[0].China_FX},{sets:["China_FC"],size:e.China_FX_FC_SC_TU[0].China_FC},{sets:["China_SC"],size:e.China_FX_FC_SC_TU[0].China_SC},{sets:["China_FX","China_FC"],size:e.China_FX_FC_SC_TU[0].China_FX_FC},{sets:["China_FX","China_SC"],size:e.China_FX_FC_SC_TU[0].China_FX_SC},{sets:["China_FC","China_SC"],size:e.China_FX_FC_SC_TU[0].China_FC_SC},{sets:["China_FX","China_FC","China_SC"],size:e.China_FX_FC_SC_TU[0].China_FX_FC_SC}];t.vennData=a,setTimeout(function(){var t=d3.select("#venn"),e=d3.select("body").append("div").attr("class","venntooltip");t.selectAll("g").on("mouseover",function(a){venn.sortAreas(t,a),e.transition().duration(400).style("opacity",.9),e.text(a.size+" users");var n=d3.select(this).transition("tooltip").duration(400);n.select("path").style("stroke-width",3).style("fill-opacity",1==a.sets.length?.4:.1).style("stroke-opacity",1)}).on("mousemove",function(){e.style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(t){e.transition().duration(400).style("opacity",0);var a=d3.select(this).transition("tooltip").duration(400);a.select("path").style("stroke-width",0).style("fill-opacity",1==t.sets.length?.25:0).style("stroke-opacity",0)})},300)})}}]),angular.module("inspinia").controller("SelectorCtrl",["$scope","$rootScope",function(t,e){t.people=[{name:"Adam",email:"adam@email.com",age:12,country:"United States"},{name:"Amalie",email:"amalie@email.com",age:12,country:"Argentina"},{name:"Estefanía",email:"estefania@email.com",age:21,country:"Argentina"},{name:"Adrian",email:"adrian@email.com",age:21,country:"Ecuador"},{name:"Wladimir",email:"wladimir@email.com",age:30,country:"Ecuador"},{name:"Samantha",email:"samantha@email.com",age:30,country:"United States"},{name:"Nicole",email:"nicole@email.com",age:43,country:"Colombia"},{name:"Natasha",email:"natasha@email.com",age:54,country:"Ecuador"},{name:"Michael",email:"michael@email.com",age:15,country:"Colombia"},{name:"Nicolás",email:"nicolas@email.com",age:43,country:"Colombia"}],t.onSelect=function(t){e.$broadcast("changeSelector",t)}}]),angular.module("inspinia").controller("ChartCtrl",["$scope","$http",function(t,e){t.$on("changeSelector",function(t,e){console.info(e)}),t.loadData=function(a){e.get("getDataFromFile?file="+a).success(function(e){e=e.data;var n=a.split("|");t.chartConfig.series=[];for(var i=0;i<n.length;i++){for(var o=[],l=0;l<e[n[i]].length;l++)o.push([Date.parse(e[n[i]][l].date),parseInt(e[n[i]][l][t.valueName])]);t.chartConfig.series.push({name:t[n[i]],data:o})}console.info(t.chartConfig)})},t.chartConfig={chart:{backgroundColor:null,zoomType:"x"},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%b. %e",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Users"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.f} users"},legend:{enabled:!0},plotOptions:{area:{color:"#0038ff",marker:{enabled:null},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},credits:{enabled:!1},series:t.chartSeries}}]),angular.module("inspinia").controller("ChartComLineCtrl",["$scope","$http",function(t,e){t.loadData=function(a){e.get("getDataFromFile?file="+a).success(function(e){e=e.data;var a=[],n=[],i={};i={Others:0};for(var o={},l=0;l<e.Global_Country_TU.length&&4>l;l++)a.push(e.Global_Country_TU[l]),n.push(e.Global_Country_TU[l].Country),i[e.Global_Country_TU[l].Country]=0;for(var l=0;l<e.Date_Global_Country_TU.length;l++)if(n.indexOf(e.Date_Global_Country_TU[l].country)>=0){"TW"==e.Date_Global_Country_TU[l].country&&console.info(e.Date_Global_Country_TU[l]);var r=i[e.Date_Global_Country_TU[l].country]+parseInt(e.Date_Global_Country_TU[l]["Total Users"]);i[e.Date_Global_Country_TU[l].country]=r;var s=[Date.parse(e.Date_Global_Country_TU[l].date),r];o[e.Date_Global_Country_TU[l].country]&&o[e.Date_Global_Country_TU[l].country].length>0?o[e.Date_Global_Country_TU[l].country].push(s):(o[e.Date_Global_Country_TU[l].country]=[],o[e.Date_Global_Country_TU[l].country].push(s))}else{var r=i.Others+parseInt(e.Date_Global_Country_TU[l]["Total Users"]);i.Others=r;var s=[Date.parse(e.Date_Global_Country_TU[l].date),r];o.Others&&o.Others.length>0?o.Others.push(s):(o.Others=[],o.Others.push(s))}var c=[];n.push("Others");for(var h in n)c.push({name:n[h],data:o[n[h]]});t.chartConfig.series=c})},t.chartConfig={chart:{backgroundColor:null,zoomType:"x"},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%b. %e",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Users"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.f} users"},legend:{enabled:!0},plotOptions:{area:{color:"#0038ff",marker:{enabled:null},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},credits:{enabled:!1},series:t.chartSeries}}]),angular.module("inspinia").controller("ChartAreaCtrl",["$scope","$http",function(t,e){t.$on("redraw",function(){console.info("on redraw"),t.chartConfig=t.chartConfig}),t.loadData=function(a){e.get("getDataFromFile?file="+a).success(function(e){e=e.data;var n=a.split("|");t.chartConfig.series=[];for(var i=0;i<n.length;i++){for(var o=[],l=0;l<e[n[i]].length;l++)o.push([Date.parse(e[n[i]][l].date),parseInt(e[n[i]][l][t.valueName])]);t.chartConfig.series.push({type:"area",name:t[n[i]],data:o})}console.info(t.chartConfig)})},t.chartConfig={chart:{backgroundColor:null,zoomType:"x"},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%b. %e",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Users"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.f} users"},legend:{enabled:!0},plotOptions:{area:{color:"#0038ff",marker:{enabled:null},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},credits:{enabled:!1},series:t.chartSeries}}]),$(document).ready(function(){function t(){var t=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",t+"px");var e=$("nav.navbar-default").height(),a=$("#page-wrapper").height();e>a&&$("#page-wrapper").css("min-height",e+"px"),a>e&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&$("#page-wrapper").css("min-height",$(window).height()-60+"px")}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||t()}),setTimeout(function(){t()})}),$(function(){$(window).bind("load resize",function(){$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")})}),angular.module("inspinia").directive("sideNavigation",["$timeout",function(t){return{restrict:"A",link:function(e,a){e.$watch("authentication.user",function(){t(function(){a.metisMenu()})})}}}]).directive("minimalizaSidebar",["$timeout",function(t){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-init="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope","$element",function(e){e.minimalize=function(){angular.element("body").toggleClass("mini-navbar"),!angular.element("body").hasClass("mini-navbar")||angular.element("body").hasClass("body-small")?(angular.element("#side-menu").hide(),t(function(){angular.element("#side-menu").fadeIn(500)},100)):angular.element("#side-menu").removeAttr("style")}}]}}]),angular.module("inspinia").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="wrapper wrapper-content animated fadeInRight"><div ng-include="\'components/chart/chart_tu.html\'"></div><div class="row chartPanel"><div ng-include="\'components/chart/chart_fx_fc_sc.html\'"></div><div ng-include="\'components/chart/chart_global_dist.html\'"></div></div><div class="row chartPanel"><div ng-include="\'components/chart/overlap.html\'"></div><div ng-include="\'components/chart/veen.html\'"></div></div><div ng-controller="TabsDemoCtrl" class="tab-bar"><tabset><tab heading="Global"><div class="row chartPanel"><div ng-include="\'components/chart/chart_gb_nu.html\'"></div></div></tab><tab heading="China" ng-click="click()"><div class="row chartPanel"><div ng-include="\'components/chart/chart_cn_nu.html\'"></div></div></tab></tabset></div></div>'),t.put("app/minor/minor.html",'<div class="wrapper wrapper-content animated fadeInRight"><div class="row"><div class="col-lg-12"><div class="text-center m-t-lg"><h1>Simple example of second view</h1><small>Configure in app.js as index.minor state.</small></div></div></div></div>'),t.put("components/chart/chart_cn_nu.html",'<div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Date_NU_China\')" config="chartConfig" watch="redraw"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Daily New Users\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Date_NU_China=\'China Daily New Users\'"></div><div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Week_NU_China\')" config="chartConfig" watch="redraw"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Weekly New Users\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Week_NU_China=\'China Weekly New Users\'"></div><div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Month_NU_China\')" config="chartConfig" watch="redraw"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Monthly New Users\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Month_NU_China=\'China Monthly New Users\'"></div>'),t.put("components/chart/chart_fx_fc_sc.html",'<div class="col-md-6" ng-controller="ChartCtrl"><highchart ng-init="loadData(\'Date_TU_China_FX|Date_TU_China_FC|Date_TU_China_SC\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'China FX FC SC\'"> <input type="hidden" ng-init="valueName=\'Total Users\'"> <input type="hidden" ng-init="Date_TU_China_FX=\'China FX\'"> <input type="hidden" ng-init="Date_TU_China_FC=\'China FC\'"> <input type="hidden" ng-init="Date_TU_China_SC=\'China SC\'"></div>'),t.put("components/chart/chart_gb_nu.html",'<div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Date_NU_Global\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Daily New Users\'"> <input type="hidden" ng-init="chartConfig.subtitle.text=\'Global\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Date_NU_Global=\'Global Daily New Users\'"></div><div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Week_NU_Global\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Weekly New Users\'"> <input type="hidden" ng-init="chartConfig.subtitle.text=\'Global\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Week_NU_Global=\'Global Weekly New Users\'"></div><div class="col-md-4" ng-controller="ChartAreaCtrl"><highchart ng-init="loadData(\'Month_NU_Global\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Monthly New Users\'"> <input type="hidden" ng-init="chartConfig.subtitle.text=\'Global\'"> <input type="hidden" ng-init="valueName=\'New Users\'"> <input type="hidden" ng-init="Month_NU_Global=\'Global Monthly New Users\'"></div>'),t.put("components/chart/chart_global_dist.html",'<div ng-controller="ChartComLineCtrl"><div class="col-md-6"><highchart ng-init="loadData(\'Date_Global_Country_TU|Global_Country_TU\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Global Distribution\'"></div></div>'),t.put("components/chart/chart_tu.html",'<div class="row" ng-controller="SelectorCtrl"><div class="col-md-3 selector pull-right"><ui-select ng-model="person.selected" on-select="onSelect($item, $model)" theme="select2" class="form-control" title="Choose a person"><ui-select-match placeholder="Select or search a person in the list...">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="item in people | filter: $select.search"><div ng-bind-html="item.name | highlight: $select.search"></div><small ng-bind-html="item.email | highlight: $select.search"></small></ui-select-choices></ui-select></div></div><div class="row" ng-controller="ChartCtrl"><div class="col-lg-12"><highchart ng-init="loadData(\'Date_TU_Global|Date_TU_China\')" config="chartConfig" class="span9"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Total User Growth\'"> <input type="hidden" ng-init="valueName=\'Total Users\'"> <input type="hidden" ng-init="Date_TU_Global=\'Global\'"> <input type="hidden" ng-init="Date_TU_China=\'China\'"> <input type="hidden" ng-init="chartType=\'area\'"> <input type="hidden" ng-init="chartConfig.colors=[\'#0000ff\',\'ff0066\',\'2b908f\']"></div></div>'),t.put("components/chart/overlap.html",'<div class="col-md-6" ng-controller="ChartCtrl"><highchart ng-init="loadData(\'FX_FC_Overlap|FX_SC_Overlap|FC_SC_Overlap|FX_FC_SC_Overlap\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'FX FC SC Users\'"> <input type="hidden" ng-init="chartConfig.subtitle.text=\'Overlaping Users\'"> <input type="hidden" ng-init="valueName=\'Common Users\'"> <input type="hidden" ng-init="FX_FC_Overlap=\'FX&FC\'"> <input type="hidden" ng-init="FX_SC_Overlap=\'FX&SC\'"> <input type="hidden" ng-init="FC_SC_Overlap=\'FC&SC\'"> <input type="hidden" ng-init="FX_FC_SC_Overlap=\'FX&FC&SC\'"></div>'),t.put("components/chart/veen.html",'<div class="col-md-6 venn-panel" ng-controller="VeenCtrl"><div id="venn" venn="vennData" ng-init="loadData(\'China_FX_FC_SC_TU\')"></div></div>'),t.put("components/common/content.html",'<div id="wrapper"><div ng-include="\'components/common/navigation.html\'"></div><div id="page-wrapper" class="gray-bg {{$state.current.name}}"><div ng-include="\'components/common/topnavbar.html\'"></div><div ui-view=""></div><div ng-include="\'components/common/footer.html\'"></div></div></div>'),t.put("components/common/footer.html",'<div class="footer"><div class="pull-right">10GB of <strong>250GB</strong> Free.</div><div><strong>Copyright</strong> Example Company &copy; 2014-2015</div></div>'),t.put("components/common/ibox_tools.html",'<div class="ibox-tools dropdown" dropdown=""><a ng-click="showhide()"><i class="fa fa-chevron-up"></i></a> <a class="dropdown-toggle" href="" dropdown-toggle=""><i class="fa fa-wrench"></i></a><ul class="dropdown-menu dropdown-user"><li><a href="">Config option 1</a></li><li><a href="">Config option 2</a></li></ul><a ng-click="closebox()"><i class="fa fa-times"></i></a></div>'),t.put("components/common/navigation.html",'<nav class="navbar-default navbar-static-side" role="navigation"><div class="sidebar-collapse"><ul side-navigation="" class="nav metismenu" id="side-menu"><li class="nav-header"><div class="dropdown profile-element" dropdown=""><a class="dropdown-toggle" dropdown-toggle="" href=""><span class="clear"><span class="block m-t-xs"><strong class="font-bold">{{main.userName}}</strong></span> <span class="text-muted text-xs block">Example menu<b class="caret"></b></span></span></a><ul class="dropdown-menu animated fadeInRight m-t-xs"><li><a href="">Logout</a></li></ul></div><div class="logo-element">FDT</div></li><li ui-sref-active="active"><a ui-sref="index.main"><i class="fa fa-users"></i> <span class="nav-label">User</span></a></li><li ui-sref-active="active"><a ui-sref="index.minor"><i class="fa fa-graduation-cap"></i> <span class="nav-label">School</span></a></li><li ui-sref-active="active"><a ui-sref="index.minor"><i class="fa fa-map-marker"></i> <span class="nav-label">Region</span></a></li></ul></div></nav>'),t.put("components/common/topnavbar.html",'<div class="row border-bottom"><nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0"><div class="navbar-header"><span minimaliza-sidebar=""></span><form role="search" class="navbar-form-custom" method="post" action=""><div class="form-group"><input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search"></div></form></div><ul class="nav navbar-top-links navbar-right"><li><a href=""><i class="fa fa-sign-out"></i> Log out</a></li></ul></nav></div>')}]);