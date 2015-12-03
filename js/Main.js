function MainInit() {

    var tabs = new Tabs();

    var accorditionArray    = [
        {label: 'Finances Tab', content: Utils.GetElementID('financesTab')},
        {label: 'Security', content: Utils.GetElementID('securityTab')},
        {label: 'Example', content: Utils.GetElementID('exampleTab'), inactive: true}
    ];
    var accorditionSettings = {
        appendTo: Utils.GetElementID('accorditionID'),
        active: 'Security',
        display : 'inline',
        position: 'relative',
        tabs    : accorditionArray
    };
    tabs.Init(accorditionSettings);
    tabs.RemoveTab({label: 'Finances Tab'});

}
