function MainInit() {
    var statusContent = Utils.GetElementID('statusContent'),
        photosContent = Utils.GetElementID('photosContent'),
        videoContent  = Utils.GetElementID('videoContent'),
        audioContent  = Utils.GetElementID('audioContent'),
        ulContent     = Utils.GetElementID('ulContent'),
        appendTo      = Utils.GetElementID('tabsContainer'),
        tabWithLink   = Utils.GetElementID('tabWithLink');


    Tabs.Init({
        appendTo  : appendTo,
        before    : appendTo.childNodes[0],
        defaultTab: 'audio',
        position  : 'relative',
        display   : 'block',
        tabs      : [
            {
                label  : 'status',
                href   : '#status',
                content: statusContent

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
