function MainInit() {
    var statusContent = Utils.GetElementID('statusContent'),
        photosContent = Utils.GetElementID('photosContent'),
        videoContent  = Utils.GetElementID('videoContent'),
        audioContent  = Utils.GetElementID('audioContent'),
        ulContent     = Utils.GetElementID('ulContent'),
        appendTo      = Utils.GetElementID('tabsContainer'),
        tabWithLink   = Utils.GetElementID('tabWithLink');


    Tabs.Init({
        appendTo   : appendTo,
        before     : appendTo.childNodes[0],
        // If default tab is not present all tabs content will be hidden and showed upon tab click
        defaultTab : 'audio',
        position   : 'relative',
        display    : 'inline',
        showHTMLOn : 'click',
        showULOn   : 'mouseover',
        hideULOn   : 'mouseout',
        showChildOn: 'mouseover',
        tabs       : [
            {
                label  : 'status',
                href   : '#status',
                content: statusContent,
            },
            {
                label   : 'photos',
                href    : '#photos',
                content : photosContent,
                inactive: true
            }, {
                label  : 'video',
                href   : '#video',
                content: videoContent
            }, {
                label  : 'audio',
                href   : '#audio',
                content: audioContent
            }, {
                label: 'ulcontent',
                href : '#ulcontent',
                isUL : true
            }, {
                label: 'tadijacontent',
                href : '#tadijacontent',
                isUL : true
            },
            {
                label: 'onemoretab',
                href : '#onemoretab',
                isUL : true
            },
            {
                label: 'tabwithlink',
                href : '#tabwithlink',
                isUL : true
            }
        ]
    });

}
