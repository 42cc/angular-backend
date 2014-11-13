(function() {
    $(function () {
        $('[href="' + location.hash + '"]').parent().tab('show');

        $('.nav li').click(function() {
            $(this).tab('show');

        });
    });    
})();
