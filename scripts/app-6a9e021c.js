"use strict";angular.module("inspinia",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","highcharts-ng","ui.select","angular-venn"]).config(["$stateProvider","$urlRouterProvider",function(e,a){e.state("index",{"abstract":!0,url:"/index",templateUrl:"components/common/content.html"}).state("index.main",{url:"/main",templateUrl:"app/main/main.html",data:{pageTitle:"Example view"}}).state("index.minor",{url:"/minor",templateUrl:"app/minor/minor.html",data:{pageTitle:"Example view"}}),a.otherwise("/index/main")}]),angular.module("inspinia").controller("VeenCtrl",["$scope","$http",function(e,a){e.loadData=function(t){a.get("getDataFromFile?file="+t).success(function(a){a=a.data;var t=[{sets:["China_FX"],size:a.China_FX_FC_SC_TU[0].China_FX},{sets:["China_FC"],size:a.China_FX_FC_SC_TU[0].China_FC},{sets:["China_SC"],size:a.China_FX_FC_SC_TU[0].China_SC},{sets:["China_FX","China_FC"],size:a.China_FX_FC_SC_TU[0].China_FX_FC},{sets:["China_FX","China_SC"],size:a.China_FX_FC_SC_TU[0].China_FX_SC},{sets:["China_FC","China_SC"],size:a.China_FX_FC_SC_TU[0].China_FC_SC},{sets:["China_FX","China_FC","China_SC"],size:a.China_FX_FC_SC_TU[0].China_FX_FC_SC}];e.vennData=t,setTimeout(function(){var e=d3.select("#venn"),a=d3.select("body").append("div").attr("class","venntooltip");e.selectAll("g").on("mouseover",function(t){venn.sortAreas(e,t),a.transition().duration(400).style("opacity",.9),a.text(t.size+" users");var n=d3.select(this).transition("tooltip").duration(400);n.select("path").style("stroke-width",3).style("fill-opacity",1==t.sets.length?.4:.1).style("stroke-opacity",1)}).on("mousemove",function(){a.style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(e){a.transition().duration(400).style("opacity",0);var t=d3.select(this).transition("tooltip").duration(400);t.select("path").style("stroke-width",0).style("fill-opacity",1==e.sets.length?.25:0).style("stroke-opacity",0)})},300)})}}]),angular.module("inspinia").controller("SelectorCtrl",["$scope","$rootScope",function(e,a){e.people=[{name:"Adam",email:"adam@email.com",age:12,country:"United States"},{name:"Amalie",email:"amalie@email.com",age:12,country:"Argentina"},{name:"Estefanía",email:"estefania@email.com",age:21,country:"Argentina"},{name:"Adrian",email:"adrian@email.com",age:21,country:"Ecuador"},{name:"Wladimir",email:"wladimir@email.com",age:30,country:"Ecuador"},{name:"Samantha",email:"samantha@email.com",age:30,country:"United States"},{name:"Nicole",email:"nicole@email.com",age:43,country:"Colombia"},{name:"Natasha",email:"natasha@email.com",age:54,country:"Ecuador"},{name:"Michael",email:"michael@email.com",age:15,country:"Colombia"},{name:"Nicolás",email:"nicolas@email.com",age:43,country:"Colombia"}],e.onSelect=function(e){a.$broadcast("changeSelector",e)}}]),angular.module("inspinia").controller("ChartCtrl",["$scope","$http",function(e,a){e.$on("changeSelector",function(e,a){console.info(a)}),e.loadData=function(t){a.get("getDataFromFile?file="+t).success(function(a){a=a.data;var n=t.split("|");e.chartConfig.series=[];for(var i=0;i<n.length;i++){for(var o=[],l=0;l<a[n[i]].length;l++)o.push([Date.parse(a[n[i]][l].date),parseInt(a[n[i]][l][e.valueName])]);e.chartConfig.series.push({name:e[n[i]],data:o})}console.info(e.chartConfig)})},e.chartConfig={chart:{backgroundColor:null,zoomType:"x"},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%b. %e",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Users"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.f} users"},legend:{enabled:!0},plotOptions:{area:{color:"#0038ff",marker:{enabled:null},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},credits:{enabled:!1},series:e.chartSeries}}]),angular.module("inspinia").controller("ChartComLineCtrl",["$scope","$http",function(e,a){e.loadData=function(t){a.get("getDataFromFile?file="+t).success(function(a){a=a.data;var t=[],n=[],i={};i={Others:0};for(var o={},l=0;l<a.Global_Country_TU.length&&4>l;l++)t.push(a.Global_Country_TU[l]),n.push(a.Global_Country_TU[l].Country),i[a.Global_Country_TU[l].Country]=0;for(var l=0;l<a.Date_Global_Country_TU.length;l++)if(n.indexOf(a.Date_Global_Country_TU[l].country)>=0){"TW"==a.Date_Global_Country_TU[l].country&&console.info(a.Date_Global_Country_TU[l]);var s=i[a.Date_Global_Country_TU[l].country]+parseInt(a.Date_Global_Country_TU[l]["Total Users"]);i[a.Date_Global_Country_TU[l].country]=s;var r=[Date.parse(a.Date_Global_Country_TU[l].date),s];o[a.Date_Global_Country_TU[l].country]&&o[a.Date_Global_Country_TU[l].country].length>0?o[a.Date_Global_Country_TU[l].country].push(r):(o[a.Date_Global_Country_TU[l].country]=[],o[a.Date_Global_Country_TU[l].country].push(r))}else{var s=i.Others+parseInt(a.Date_Global_Country_TU[l]["Total Users"]);i.Others=s;var r=[Date.parse(a.Date_Global_Country_TU[l].date),s];o.Others&&o.Others.length>0?o.Others.push(r):(o.Others=[],o.Others.push(r))}var c=[];n.push("Others");for(var d in n)c.push({name:n[d],data:o[n[d]]});e.chartConfig.series=c})},e.chartConfig={chart:{backgroundColor:null,zoomType:"x"},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%b. %e",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Users"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.f} users"},legend:{enabled:!0},plotOptions:{area:{color:"#0038ff",marker:{enabled:null},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}},credits:{enabled:!1},series:e.chartSeries}}]),$(document).ready(function(){function e(){var e=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",e+"px");var a=$("nav.navbar-default").height(),t=$("#page-wrapper").height();a>t&&$("#page-wrapper").css("min-height",a+"px"),t>a&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&$("#page-wrapper").css("min-height",$(window).height()-60+"px")}$(window).bind("load resize scroll",function(){$("body").hasClass("body-small")||e()}),setTimeout(function(){e()})}),$(function(){$(window).bind("load resize",function(){$(this).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small")})}),angular.module("inspinia").directive("sideNavigation",["$timeout",function(e){return{restrict:"A",link:function(a,t){a.$watch("authentication.user",function(){e(function(){t.metisMenu()})})}}}]).directive("minimalizaSidebar",["$timeout",function(e){return{restrict:"A",template:'<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-init="minimalize()"><i class="fa fa-bars"></i></a>',controller:["$scope","$element",function(a){a.minimalize=function(){angular.element("body").toggleClass("mini-navbar"),!angular.element("body").hasClass("mini-navbar")||angular.element("body").hasClass("body-small")?(angular.element("#side-menu").hide(),e(function(){angular.element("#side-menu").fadeIn(500)},100)):angular.element("#side-menu").removeAttr("style")}}]}}]),angular.module("inspinia").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="wrapper wrapper-content animated fadeInRight"><div ng-include="\'components/chart/chart_tu.html\'"></div><div class="row chartPanel"><div ng-include="\'components/chart/chart_fx_fc_sc.html\'"></div><div ng-include="\'components/chart/chart_global_dist.html\'"></div></div><div class="row chartPanel"><div ng-include="\'components/chart/overlap.html\'"></div><div ng-include="\'components/chart/veen.html\'"></div></div></div>'),e.put("app/minor/minor.html",'<div class="wrapper wrapper-content animated fadeInRight"><div class="row"><div class="col-lg-12"><div class="text-center m-t-lg"><h1>Simple example of second view</h1><small>Configure in app.js as index.minor state.</small></div></div></div></div>'),e.put("components/chart/chart_fx_fc_sc.html",'<div class="col-md-6" ng-controller="ChartCtrl"><highchart ng-init="loadData(\'Date_TU_China_FX|Date_TU_China_FC|Date_TU_China_SC\')" data="Date_TU_Global|Date_TU_China" config="chartConfig" class="span9" subtitle="Global & China"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'China FX FC SC\'"> <input type="hidden" ng-init="valueName=\'Total Users\'"> <input type="hidden" ng-init="Date_TU_China_FX=\'China FX\'"> <input type="hidden" ng-init="Date_TU_China_FC=\'China FC\'"> <input type="hidden" ng-init="Date_TU_China_SC=\'China SC\'"></div>'),e.put("components/chart/chart_global_dist.html",'<div ng-controller="ChartComLineCtrl"><div class="col-md-6"><highchart ng-init="loadData(\'Date_Global_Country_TU|Global_Country_TU\')" config="chartConfig" class="span9"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Global Distribution\'"></div></div>'),e.put("components/chart/chart_tu.html",'<div class="row" ng-controller="SelectorCtrl"><div class="col-md-3 selector pull-right"><ui-select ng-model="person.selected" on-select="onSelect($item, $model)" theme="select2" class="form-control" title="Choose a person"><ui-select-match placeholder="Select or search a person in the list...">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat="item in people | filter: $select.search"><div ng-bind-html="item.name | highlight: $select.search"></div><small ng-bind-html="item.email | highlight: $select.search"></small></ui-select-choices></ui-select></div></div><div class="row" ng-controller="ChartCtrl"><div class="col-lg-12"><highchart ng-init="loadData(\'Date_TU_Global|Date_TU_China\')" data="Date_TU_Global|Date_TU_China" config="chartConfig" class="span9" title="Total User Growth" subtitle="Global & China"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'Total User Growth\'"> <input type="hidden" ng-init="valueName=\'Total Users\'"> <input type="hidden" ng-init="Date_TU_Global=\'Global\'"> <input type="hidden" ng-init="Date_TU_China=\'China\'"> <input type="hidden" ng-init="chartType=\'area\'"> <input type="hidden" ng-init="chartConfig.colors=[\'#0000ff\',\'ff0066\',\'2b908f\']"></div></div>'),e.put("components/chart/overlap.html",'<div class="col-md-6" ng-controller="ChartCtrl"><highchart ng-init="loadData(\'FX_FC_Overlap|FX_SC_Overlap|FC_SC_Overlap|FX_FC_SC_Overlap\')" config="chartConfig"></highchart><input type="hidden" ng-init="chartConfig.title.text=\'FX FC SC Users\'"> <input type="hidden" ng-init="chartConfig.subtitle.text=\'Overlaping Users\'"> <input type="hidden" ng-init="valueName=\'Common Users\'"> <input type="hidden" ng-init="FX_FC_Overlap=\'FX&FC\'"> <input type="hidden" ng-init="FX_SC_Overlap=\'FX&SC\'"> <input type="hidden" ng-init="FC_SC_Overlap=\'FC&SC\'"> <input type="hidden" ng-init="FX_FC_SC_Overlap=\'FX&FC&SC\'"></div>'),e.put("components/chart/veen.html",'<div class="col-md-6 venn-panel" ng-controller="VeenCtrl"><div id="venn" venn="vennData" ng-init="loadData(\'China_FX_FC_SC_TU\')"></div></div>'),e.put("components/common/content.html",'<div id="wrapper"><div ng-include="\'components/common/navigation.html\'"></div><div id="page-wrapper" class="gray-bg {{$state.current.name}}"><div ng-include="\'components/common/topnavbar.html\'"></div><div ui-view=""></div><div ng-include="\'components/common/footer.html\'"></div></div></div>'),e.put("components/common/footer.html",'<div class="footer"><div class="pull-right">10GB of <strong>250GB</strong> Free.</div><div><strong>Copyright</strong> Example Company &copy; 2014-2015</div></div>'),e.put("components/common/ibox_tools.html",'<div class="ibox-tools dropdown" dropdown=""><a ng-click="showhide()"><i class="fa fa-chevron-up"></i></a> <a class="dropdown-toggle" href="" dropdown-toggle=""><i class="fa fa-wrench"></i></a><ul class="dropdown-menu dropdown-user"><li><a href="">Config option 1</a></li><li><a href="">Config option 2</a></li></ul><a ng-click="closebox()"><i class="fa fa-times"></i></a></div>'),e.put("components/common/navigation.html",'<nav class="navbar-default navbar-static-side" role="navigation"><div class="sidebar-collapse"><ul side-navigation="" class="nav metismenu" id="side-menu"><li class="nav-header"><div class="dropdown profile-element" dropdown=""><a class="dropdown-toggle" dropdown-toggle="" href=""><span class="clear"><span class="block m-t-xs"><strong class="font-bold">{{main.userName}}</strong></span> <span class="text-muted text-xs block">Example menu<b class="caret"></b></span></span></a><ul class="dropdown-menu animated fadeInRight m-t-xs"><li><a href="">Logout</a></li></ul></div><div class="logo-element">FDT</div></li><li ui-sref-active="active"><a ui-sref="index.main"><i class="fa fa-users"></i> <span class="nav-label">User</span></a></li><li ui-sref-active="active"><a ui-sref="index.minor"><i class="fa fa-graduation-cap"></i> <span class="nav-label">School</span></a></li><li ui-sref-active="active"><a ui-sref="index.minor"><i class="fa fa-map-marker"></i> <span class="nav-label">Region</span></a></li></ul></div></nav>'),e.put("components/common/topnavbar.html",'<div class="row border-bottom"><nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0"><div class="navbar-header"><span minimaliza-sidebar=""></span><form role="search" class="navbar-form-custom" method="post" action=""><div class="form-group"><input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search"></div></form></div><ul class="nav navbar-top-links navbar-right"><li><a href=""><i class="fa fa-sign-out"></i> Log out</a></li></ul></nav></div>')}]);