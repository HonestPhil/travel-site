import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor(){
        this.lazyImages = $(".lazyload");
        this.siteHeader = $(".site-header");
        this.headerTrigger = $(".large-hero__title");
        this.createHeaderWaypoint();
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a")
        this.createSectionWaypoint();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }
    
    refreshWaypoints() {
        this.lazyImages.on('load', function(){
           Waypoint.refreshAll(); 
        });
    }
    
    addSmoothScrolling(){
        this.headerLinks.smoothScroll();
    }
    
    createHeaderWaypoint(){
        var that = this;
        new Waypoint({
            element: this.headerTrigger[0],
            handler: function(direction){
                if(direction == "down"){
                    that.siteHeader.addClass("site-header--dark");    
                } else {
                    that.siteHeader.removeClass("site-header--dark");    
                }
            },
        });
    }
    
    createSectionWaypoint() {
        var that = this;
        this.pageSections.each(function(){
           var currentPageSection = this;
           new Waypoint({
               element: currentPageSection,
               handler: function(direction){
                   var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                   if(direction == "down"){
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link")
                   }
               },
               offset: "25%"
           });
           
           new Waypoint({
               element: currentPageSection,
               handler: function(direction){
                   var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                   if(direction == "up"){
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link")
                   }
               },
               offset: "-40%"
           });
        });
    }
}

export default StickyHeader;