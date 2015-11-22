function MainInit() {
    var statusContent      = Utils.GetElementID('statusContent'),
        photosContent      = Utils.GetElementID('photosContent'),
        videoContent       = Utils.GetElementID('videoContent'),
        audioContent       = Utils.GetElementID('audioContent'),
        ulContent          = Utils.GetElementID('ulcontent'),
        tadijaContent      = Utils.GetElementID('onemoretab'),
        tabwithlinkContent = Utils.GetElementID('tabwithlink'),
        appendTo           = Utils.GetElementID('tabsContainer'),
        tabWithLink        = Utils.GetElementID('tabWithLink');


    Tabs.Init({
        appendTo   : appendTo,
        before     : appendTo.childNodes[0],
        // If default tab is not present all tabs content will be hidden and showed upon tab click
        defaultTab : 'Status Tab',
        position   : 'relative',
        display    : 'inline',
        showHTMLOn : 'click',
        showULOn   : 'mouseover',
        hideULOn   : 'mouseout',
        showChildOn: 'mouseover',
        hideChildOn: 'mouseout',
        tabs       : [
            {
                label  : 'Status Tab',
                href   : '#status',
                content: statusContent
            },
            {
                label   : 'Photos Tab',
                href    : '#photos',
                content : photosContent,
                inactive: true
            }, {
                label  : 'Video Tab',
                href   : '#video',
                content: videoContent
            }, {
                label  : 'Audio Tab',
                href   : '#audio',
                content: audioContent
            }, {
                label  : 'Some Ul Content',
                href   : '#ulcontent',
                content: ulContent,
                isUL   : true
            }, {
                label   : 'Tadija Tab',
                href    : '#tadijacontent',
                content : tadijaContent,
                isUL    : true,
                inactive: true
            },
            {
                label  : 'tabwithlink',
                href   : '#tabwithlink',
                content: tabwithlinkContent,
                isUL   : true
            }
        ]
    });

}
