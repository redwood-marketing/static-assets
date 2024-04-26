
<?php

$query = new WP_Query(array(
    'post_type' => 'header_and_footer',
    'post_status' => 'publish'
));

if ($query->have_posts()) : $query->the_post();
    
?>
    <!-- Above Footer -->
    <section id="above-footer" class="py-100 color-light">
        <div class="wrapper">
            <div class="above-footer-container">
                <?php the_field( 'footer_above', 'option' ); ?>
            </div>
        </div>
    </section>

    <div class="footer" id="reg-footer">
        <div class="max-width">
            <div id="p_lt_ctl02_UserControl1_userControlElem_footerShow">

                <div class="top-footer">
                    <div class="top-footer-item">
                        <strong>Product</strong>
                        <a href="/en-us/demo/get-started">Get an ActiveBatch Demo</a>
                        <a href="/en-us/activebatch"> ActiveBatch Overview</a>
                        <a href="/en-us/activebatch/core-capabilities/workflow-management/integrated-jobs-library">No-Code Job Steps</a>
                        <a href="/en-us/activebatch/core-capabilities/workflow-management/service-library">Low-Code API Accessibility</a>
                        <a href="/en-us/activebatch/extensions">Integrations</a>
                        <a href="/en-us/activebatch/pricing">Pricing</a>
                    </div>
                    <div class="top-footer-item">
                        <strong>Workload Automation</strong>
                        <a href="/en-us/activebatch/business-process-automation">For Business Processes</a>
                        <a href="/en-us/activebatch/service-level-management">For Service Level Management</a>
                        <a href="/en-us/activebatch/orchestration">For Process Orchestration</a>
                        <a href="/en-us/activebatch/job-scheduling/batch-scheduling">For Batch Scheduling</a>
                        <a href="/en-us/activebatch/hybrid-cloud-management">For Hybrid or Multi-Cloud IT</a>
                        <a href="/en-us/activebatch/data-warehouse-etl-automation">For Data Warehousing</a>
                    </div>
                    <div class="top-footer-item">
                        <strong>Learn More</strong>
                        <a href="/en-us/resource/workload-automation-overview">Workload Automation Overview</a>
                        <a href="/en-us/resource/universal-workload-automation-security">Security-Driven Automation</a>
                        <a href="/blog/gartner-it-automation">Gartner IT Automation Predictions</a>
                        <a href="/blog/workload-automation-robotic-process-automation">Workload Automation vs. RPA</a>
                        <a href="/blog/workload-automation-gartner">Gartner Workload Automation Trends</a>
                        <a href="/blog/gartner-devops">7 Steps to DevOps</a>
                    </div>
                </div>
                <div class="mid-footer">
                    <div class="mid-footer-links">
                        <div class="mid-footer-item">
                            <strong>Resources</strong>
                            <a href="/en-us/activebatch-resources?type=casestudy">Case Studies</a>
                            <a href="/en-us/activebatch-resources?type=whitepaper">White Papers</a>
                            <a href="/en-us/activebatch-resources?type=datasheet">Datasheets</a>
                            <a href="/en-us/activebatch-resources?type=video">Videos</a>
                            <a href="/blog">Blog</a>
                        </div>
                        <div class="mid-footer-item">
                            <strong>Company</strong>
                            <a href="/en-us/about-us">About Us</a>
                            <a href="/en-us/news">News and Press Releases</a>
                            <!--<a href="/en-us/news/events">Events</a>-->
                            <a href="/en-us/about-us/partners">Partners</a>
                            <a href="/en-us/about-us/careers">Careers</a>
                        </div>
                        <div class="mid-footer-item">
                            <strong>Customer</strong>
                            <a href="https://www.advsyscon.com/en-us/portal/login">My ASCI Login</a>
                            <a href="/en-us/activebatch-academy">Training</a>
                            <a href="https://support.advsyscon.com/" nofollow>Support</a>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>
                        <strong>Connect with us</strong>
                        <a href="https://www.linkedin.com/company/advanced-systems-concepts-inc-/" title="LinkedIn" target="_blank"><img src="/en-us/corporatesite/media/i/linkedin-icon.png" alt="LinkedIn"></a>
                        <a href="https://twitter.com/activebatch" title="Twitter" target="_blank"><img src="/en-us/corporatesite/media/i/twitter-icon.png" alt="Twitter"></a>
                        <a href="https://www.youtube.com/channel/UC7QZYvPkK93amZEn6VsOXYg" title="Youtube" target="_blank"><img src="/en-us/corporatesite/media/i/youtube-icon.png" alt="Youtube"></a>
                        <a href="https://www.facebook.com/AdvancedSystemsConceptsInc" title="Facebook" target="_blank"><img src="/en-us/corporatesite/media/i/facebook-icon.png" alt="Facebook"></a>
                    </div>
                </div>

            </div>
            <div class="footer-content">
                <div class="footer-item copyright">
                    <a href="/en-us/about-us/contact-us">Contact Us</a> | <a href="/en-us/about-us/privacy">Privacy Policy</a> | <a href="/en-us/site-map">Sitemap</a><br><br>
                    <b>Corporate HQ</b><br>
                    Advanced Systems Concepts, Inc.<br>
                    3201 Dallas Parkway - Suite 810<br>
                    Frisco, TX 75034<br><br>
                    © <?= date("Y"); ?> - Redwood Software, Inc. All Rights Reserved.
                </div>
                <div class="footer-item logo">
                    <a id="p_lt_ctl02_UserControl1_userControlElem_logohome" href="https://www.advsyscon.com"><img src="/activebatch-logo.svg" alt="ActiveBatch Workload Automation"></a>
                </div>
            </div>

        </div>
    </div>
<?php endif;?>

</div>

<?php wp_footer(); ?>
</body>
</html>