var Tabs = (function () {
    'use strict';

    // Private fields
    var tabULContainer  = document.createElement('ul'),
        tabContent      = [],
        tabLinksArray   = [],
        tabLIArray      = [],
        idPostfix       = 'ID',
        tabLIElement,
        aTag,


        // Holder objects
        settings        = {},
        currentTab      = {},
        defaultSettings = {
            appendTo  : document.body,
            position  : 'fixed',
            active    : '',
            display   : 'block',
            cssClass  : 'oneMoreTabClass',
            tabs      : [],
            ulID      : 'tabsID',
            showHTMLOn: 'click',
            defaultTab: {
                label   : 'new tab',
                href    : '#',
                inactive: false,
                id      : 'newtabID',
                content : 'Example tab content'
            }
        };

    function CreateLinks(currentTab) {
        var aHref       = document.createElement('a');
        aHref.setAttribute('href', currentTab.tabHref);
        aHref.innerHTML = currentTab.tabTitle;

        // Creates LI element and appends href
        tabLIElement = document.createElement('LI');
        tabLIElement.setAttribute('id', currentTab.tabID);
        tabLIElement.appendChild(aHref);

        // Appends li to ul container
        tabULContainer.appendChild(tabLIElement);

        // Appends Tab UL to appendTo element before settings.before element
        settings.appendTo.insertBefore(tabULContainer, settings.before);
    }

    function GetContent(currentTab) {
        // Gets tabs child nodes
        tabLIArray = Utils.GetElementID(settings.ulID).childNodes;

        aTag                                    = GetFirstChildWithTagName(tabLIArray[currentTab.tabIndex], 'a');
        tabLinksArray[currentTab.tabTitleLower] = aTag;
        currentTab.content ? tabContent[currentTab.tabTitleLower] = currentTab.content : null;

        // On tab action
        if (tabLinksArray.hasOwnProperty(currentTab.tabTitleLower) && !currentTab.inactive) {
            if (currentTab.content) {
                Utils.GetElementID(currentTab.tabID).addEventListener(settings.showHTMLOn, ShowHTMLContent);
            }
        }
    }

    function ShowHTMLContent() {
        // Gets the name of selected tab
        var selectedTab = ReturnSelected();

        for (var id in tabContent) {
            if (id === selectedTab.selected) {
                if (tabContent.hasOwnProperty(id)) {
                    Utils.RemoveClassAttribute(tabLinksArray[id]);
                    Utils.RemoveClassAttribute(tabContent[id]);

                    Utils.AddClass(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabContent[id], 'tabContent');
                }
            }
            else {
                if (tabContent.hasOwnProperty(id)) {
                    Utils.RemoveClassWithName(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabContent[id], 'tabContentHide');
                }
            }
        }
    }

    function SetTabStyle() {
        // Hides all tabs content at the start
        if (currentTab.content) {
            Utils.AddClass(tabContent[currentTab.tabTitleLower], 'tabContentHide');
        }

        // Set style for default tab
        if (currentTab.tabTitle === settings.active) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'selected');
            Utils.AddClass(tabContent[currentTab.tabTitleLower], 'tabContent');
        }

        // Set style for inactive tab
        if (currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'inactiveLink');
            Utils.AddClass(tabContent[currentTab.tabTitleLower], 'tabContentHide');
        }

        Utils.AddClass(tabLIArray[currentTab.tabIndex], 'tabsLiElement');
        tabLIArray[currentTab.tabIndex].style.display = settings.display;
    }

    function GetFirstChildWithTagName(element, tagName) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName.toLowerCase() == tagName) return element.childNodes[i];
        }
    }

    function ReturnSelected(e) {
        var elem,
            evt = e ? e : event;

        if (evt.srcElement) {
            elem = evt.srcElement;
        }
        else if (evt.target) {
            elem = evt.target;
        }
        return {
            selected: elem.innerText.toLowerCase()
        };
    }

    // Public API
    return {

        Init: function (parameters) {
            settings.appendTo   = parameters.appendTo || defaultSettings.appendTo;
            settings.before     = parameters.before || settings.appendTo.children[0];
            settings.position   = parameters.position || defaultSettings.position;
            settings.active     = parameters.active || defaultSettings.active;
            settings.display    = parameters.display || defaultSettings.display;
            settings.showHTMLOn = parameters.showHTMLOn || defaultSettings.showHTMLOn;
            settings.tabs       = parameters.tabs || defaultSettings.tabs;
            settings.ulID       = parameters.ulID || defaultSettings.ulID;
            settings.cssClass   = parameters.cssClass || defaultSettings.cssClass;


            // Sets ul element with id="tabs"
            tabULContainer.setAttribute('id', settings.ulID);

            for (var i = 0; i < settings.tabs.length; i++) {
                currentTab               = settings.tabs[i];
                currentTab.tabIndex      = i;
                currentTab.tabTitle      = currentTab.label || defaultSettings.defaultTab.label;
                currentTab.tabTitleLower = currentTab.tabTitle.toLowerCase();
                currentTab.tabID         = currentTab.tabTitleLower.replace(/\s+/g, '') + idPostfix;
                currentTab.tabHref       = currentTab.href || defaultSettings.defaultTab.href;
                currentTab.inactive      = currentTab.inactive || defaultSettings.defaultTab.inactive;
                currentTab.isUL          = currentTab.isUL || defaultSettings.defaultTab.isUL;

                CreateLinks(currentTab);
                if (currentTab.content && !currentTab.ajaxContent) {
                    GetContent(currentTab);
                }
                else if (currentTab.ajaxContent && !currentTab.content) {

                }
                // Set style for single tab
                SetTabStyle(currentTab);
            }
            // Set style for ul container
            tabULContainer.style.position = settings.position;
            Utils.AddClass(tabULContainer, 'tabs');
            Utils.AddClass(tabULContainer, settings.cssClass);

        },

        AppendTab: function (params) {
            if (!params.label || !params.content) {
                alert('New tab must have label and content!');
            }
            else {
                var newTab = {
                    label   : params.label || defaultSettings.defaultTab.label,
                    href    : params.href || defaultSettings.defaultTab.href,
                    content : params.content || defaultSettings.defaultTab.content,
                    isUL    : params.isUL || defaultSettings.defaultTab.isUL,
                    inactive: params.inactive || defaultSettings.defaultTab.inactive,
                    id      : params.id + idPostfix || defaultSettings.defaultTab.id
                };

                currentTab               = newTab;
                currentTab.tabTitle      = newTab.label;
                currentTab.tabTitleLower = currentTab.tabTitle.toLowerCase();
                currentTab.tabID         = currentTab.tabTitleLower.replace(/\s+/g, '') + idPostfix;
                currentTab.tabHref       = newTab.href.toLowerCase();
                currentTab.tabIndex      = settings.tabs.length;

                //Do some stuff for new tab, create link, get content and set styling
                CreateLinks(currentTab);
                GetContent(currentTab);
                SetTabStyle(currentTab);

                // Add new tab to tabs array
                settings.tabs.push(newTab);
            }


        },

        RemoveTab: function (params) {
            if (!params.label) {
                alert('To remove tab you must provide its label!');
            }
            else {
                var removeLabel = params.label,
                    removeTab   = {};

                for (var i = 0; i < settings.tabs.length; i++) {
                    removeTab = settings.tabs[i];
                    if (removeLabel === removeTab.label) {
                        if (removeTab.tabIndex > -1) {
                            // Remove tab content, link and li element
                            settings.tabs.splice(removeTab.tabIndex, 1);
                            tabLIArray[removeTab.tabIndex].remove();
                            tabContent[removeTab.label.toLowerCase()].remove();
                            tabLinksArray[removeTab.label.toLowerCase()].remove();
                        }
                    }
                }
            }
        }

    };

});
