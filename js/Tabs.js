var Tabs = (function () {
    'use strict';

    // Private fields
    var tabULContainer  = document.createElement('ul'),
        tabHTMLContent  = [],
        tabULContent    = [],
        tabLinksArray   = [],
        tabLIArray      = [],
        idPostfix       = 'ID',
        tabLIElement,
        aTag,


        // Holder objects
        settings        = {},
        currentTab      = {},
        defaultSettings = {
            appendTo   : document.body,
            position   : 'fixed',
            active     : '',
            display    : 'block',
            tabs       : [],
            ulID       : 'tabsID',
            showHTMLOn : 'click',
            showULOn   : 'click',
            hideULOn   : 'click',
            showChildOn: 'click',
            hideChildOn: 'click',
            defaultTab : {
                label   : 'new tab',
                href    : '#',
                inactive: false,
                isUL    : false,
                id      : 'newtabID',
                content : document.createElement('h1').innerHTML = 'Example tab content'
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
        currentTab.content ? tabHTMLContent[currentTab.tabTitleLower] = currentTab.content : null;
        currentTab.isUL ? tabULContent[currentTab.tabTitleLower] = currentTab.content : null;

        // On tab action
        if (tabLinksArray.hasOwnProperty(currentTab.tabTitleLower) && !currentTab.inactive) {
            if (!currentTab.isUL) {
                Utils.GetElementID(currentTab.tabID).addEventListener(settings.showHTMLOn, ShowHTMLContent);
            }
            else if (currentTab.isUL) {
                Utils.GetElementID(currentTab.tabID).addEventListener(settings.showULOn, ShowULContent);
            }
        }
    }

    function ShowHTMLContent() {
        // Gets the name of selected tab
        var selectedTab = ReturnSelected();

        for (var id in tabHTMLContent) {
            if (id === selectedTab.selected) {
                if (tabHTMLContent.hasOwnProperty(id)) {
                    Utils.RemoveClassAttribute(tabLinksArray[id]);
                    Utils.RemoveClassAttribute(tabHTMLContent[id]);

                    Utils.AddClass(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabHTMLContent[id], 'tabContent');
                }
            }
            else {
                if (tabHTMLContent.hasOwnProperty(id)) {
                    Utils.RemoveClassWithName(tabLinksArray[id], 'selected');
                    Utils.AddClass(tabHTMLContent[id], 'tabContentHide');
                }
            }
        }
    }

    function ShowULContent() {
        var selectedTab = ReturnSelected();

        for (var ulTab in tabULContent) {
            if (ulTab === selectedTab.selected) {
                if (tabULContent.hasOwnProperty(ulTab)) {
                    // Get ID of selected link
                    var selectedID   = tabULContent[ulTab].id,
                        mainUL       = Utils.GetElementID(selectedID),
                        liChildes    = mainUL.getElementsByTagName('li'),
                        toogle       = Utils.HasClass(mainUL, 'tabDropdownHide') ? true : false,
                        currentChild = {},
                        currentChildUL;

                    // Show or hide ul on action
                    toogle
                        ? (Utils.RemoveClassWithName(mainUL, 'tabDropdownHide'),
                        Utils.AddClass(mainUL, 'tabDropdownShow'))
                        : (Utils.RemoveClassWithName(mainUL, 'tabDropdownShow'),
                        Utils.AddClass(mainUL, 'tabDropdownHide'));

                    // Check for child elements of li
                    for (var i = 0; i < liChildes.length; i++) {
                        currentChild   = liChildes[i];
                        currentChildUL = GetFirstChildWithTagName(currentChild, 'ul');

                        if (currentChildUL !== undefined) {
                            Utils.AddClass(currentChildUL, 'ulHide');

                            currentChild.addEventListener(settings.showChildOn, function () {
                                var childToogle = Utils.HasClass(this.firstElementChild, 'ulHide') ? true : false;
                                if (childToogle) {
                                    Utils.RemoveClassWithName(this.firstElementChild, 'ulHide');
                                    Utils.AddClass(this.firstElementChild, 'ulShow');
                                }
                                else if (!childToogle) {
                                    Utils.RemoveClassWithName(this.firstElementChild, 'ulShow');
                                    Utils.AddClass(this.firstElementChild, 'ulHide');
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    function SetTabStyle() {

        // Hides all tabs content at the start
        currentTab.isUL ? Utils.AddClass(tabULContent[currentTab.tabTitleLower], 'tabDropdownHide') :
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContentHide');

        // Set style for default tab
        if (currentTab.tabTitle === settings.active) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'selected');
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContent');
        }

        // Set style for inactive tab
        if (currentTab.inactive) {
            Utils.RemoveClassAttribute(tabLinksArray[currentTab.tabTitleLower]);
            Utils.RemoveClassAttribute(tabHTMLContent[currentTab.tabTitleLower]);

            Utils.AddClass(tabLinksArray[currentTab.tabTitleLower], 'inactiveLink');
            Utils.AddClass(tabHTMLContent[currentTab.tabTitleLower], 'tabContentHide');
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

    // Public methods
    return {

        Init: function (parameters) {
            settings.appendTo    = parameters.appendTo || defaultSettings.appendTo;
            settings.before      = parameters.before || settings.appendTo.children[0];
            settings.position    = parameters.position || defaultSettings.position;
            settings.active      = parameters.active || defaultSettings.active;
            settings.display     = parameters.display || defaultSettings.display;
            settings.showHTMLOn  = parameters.showHTMLOn || defaultSettings.showHTMLOn;
            settings.showULOn    = parameters.showULOn || defaultSettings.showULOn;
            settings.hideULOn    = parameters.hideULOn || defaultSettings.hideULOn;
            settings.showChildOn = parameters.showChildOn || defaultSettings.showChildOn;
            settings.hideChildOn = parameters.hideChildOn || defaultSettings.hideChildOn;
            settings.tabs        = parameters.tabs || defaultSettings.tabs;
            settings.ulID        = parameters.ulID || defaultSettings.ulID;


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
                if ((currentTab.content || currentTab.isUL) && !currentTab.ajaxContent) {
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
        },

        AppendTab: function (params) {
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
        },

        RemoveTab: function (params) {
            if (params) {
                var removeLabel = params.label,
                    removeTab   = {},
                    index       = 0;

                for (var i = 0; i < settings.tabs.length; i++) {
                    removeTab = settings.tabs[i];
                    if (removeLabel === removeTab.label) {
                        index = removeTab.tabIndex;
                        if (index > -1) {
                            // Remove element from tabs array
                            settings.tabs.splice(index, 1);
                            // Remove link from links array
                            tabLIArray[index].remove();
                        }
                    }

                }
            }
        }
    };

});
