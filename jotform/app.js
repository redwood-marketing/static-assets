PetiteVue.createApp({
    sections: [
        {
            title: "Get a custom report with actionable recommendations",
            content: "based on your unique tech stack, strategic initiatives and operational setup <br><br> 16 questions",
            navigation: [
                {
                    label: "Do a quick assessment <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' width='2ch' fill='currentColor'><path d='M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z'/></svg>",
                    action: "next"
                }
            ]
        },
        {
            title: "Automation in your industry",
            content: "<p style='text-align: left'>Automation strategy and maturity can be impacted by industry and area of focus. For example, 73% of <strong>IT</strong> leaders credit automation with reducing manual workloads by 10-50%, allowing these team to support broader business goals. </p><p style='text-align: left'><strong>Manufacturing and retail</strong> sectors are expanding automation in workflow and warehouse operations, reducing production costs and minimizing errors. Warehouse automation is projected to become a $44 billion industry by 2028.</p><p style='text-align: left'>On average, 26% of an organization’s automations fall under<strong> finance</strong>, and it's been found that 80% of finance operations can potentially be automated, freeing up a significant percentage of employee time to focus on strategic initiatives, customer satisfaction, etc. The order-to-cash process, for example, accounts for 57% of finance automations. </p><p style='text-align: left'>Let's explore automation specific to your industry so you can start developing benchmarks for your organization's automation maturity.</p><p style='text-align: left'><span style=\"font-family: helvetica, arial, sans-serif; font-size: 8pt;\">Source: <a href=\"https://www.salesforce.com/content/dam/web/en_us/www/documents/platform/it-leaders-fueling-time-and-cost-savings-with-process-automation.pdf\" target=\"_blank\" rel=\"nofollow\">Salesforce</a>; <a href=\"https://www.thelogisticsiq.com/research/warehouse-automation-market/\" target=\"_blank\" rel=\"nofollow\">LogisticsIQ</a>; <a href=\"https://www.forbes.com/councils/forbesfinancecouncil/2023/10/25/why-financial-automation-should-be-the-next-step-for-companies/\" target=\"_blank\" rel=\"nofollow\">Accenture</a>; <a href=\"https://www.workato.com/the-connector/finance-automation-statistics/\" target=\"_blank\" rel=\"nofollow\">Work automation index</a></p>" 
        },
        {
            title: "Let's explore automation specific to your industry so you can start developing benchmarks for your organization's automation maturity.",
            content: "",
            children: [
                {
                    title: "What industry are you in?",
                    content: "",
                    fields: [
                        {
                            type: "select",
                            options: ["Agriculture", "Automotive", "Business Services", "Chemicals", "Construction", "Consumer Services", "Education", "Energy, Utilities & Waste", "Finance", "Government", "Healthcare Services", "Holding Companies & Conglomerates", "Hospitality", "Hospitals & Physicians Clinics", "Insurance", "Law Firms & Legal Services", "Manufacturing", "Media & Internet", "Minerals & Mining", "Organizations", "Real Estate", "Retail", "Software", "Telecommunications", "Transportation", "Other"],
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "What function do you work in?",
                    content: "",
                    fields: [
                        {
                            type: "text",
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "What is your role?",
                    content: "",
                    fields: [
                        {
                            type: "text",
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "What has you assessing your automation maturity?",
                    content: "Let us know what you're looking to discover so we can generate more tailored recommendations.",
                    fields: [
                        {
                            type: "text",
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "Do you currently use any Redwood products?",
                    content: "Select all that apply.  This lets us know which Redwood product capabilities to share with you.",
                    fields: [
                        {
                            type: "checkboxes",
                            options: ["No", "Yes - RunMyJobs", "Yes - ActiveBatch", "Yes - Tidal", "Yes - Finance Automation", "Yes - JSCAPE", "Yes - Cerberus"],
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
            ]
        },
        {
            title: "Part 1: Your tech stack ",
            content: "Three key areas help evaluate automation maturity, starting with your tech stack. Your systems and applications have unique considerations and automation functionality. Let's identify untapped opportunity with what you currently have.",
            children: [
                {
                    title: "What applications or systems of record do you use?",
                    content: "Your applications or systems of record (SoR) are important considerations for automation because they serve as the central repository for the data that automation processes rely on to execute tasks accurately and consistently. Select none if not applicable.",
                    fields: [
                        {
                            type: "select",
                            options: ["SAP ECC", "SAP S/4HANA on-prem", "SAP S/4HANA private cloud", "SAP S/4HANA public cloud", "Oracle EBS", "Oracle PeopleSoft", "Oracle JD Edwards", "Oracle Netsuite", "Oracle Fusion", "Workday", "Microsoft Dynamics 365", "Other" ],
                            label: "",
                            help: "ERP",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["SAP BW or SAP BW4/HANA", "SAP Business Objects", "SAP Datasphere", "SAP Analytics Cloud", "Oracle Business Intelligence", "Oracle Autonomous Data Warehouse", "Oracle Analytics", "Azure Synapse", "Databricks", "Snowflake", "Synapse", "Power BI", "Qlik", "Tableau", "Other"],
                            label: "",
                            help: "Data warehousing and analytics",
                            value: ""
                        },
                        {
                            type: "select",
                            options: ["Salesforce", "SAP CRM/CX Solutions", "Oracle CRM/CX", "Other"],
                            label: "",
                            help: "CRM",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Oracle Cloud SCM", "SAP SCM", "SAP Integrated Business Planning", "Other", "None"],
                            label: "",
                            help: "Supply chain planning",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["SAP Transportation Management", "Oracle Transportation Management Cloud", "GoRamp", "Other", "None"],
                            label: "",
                            help: "Logistics and transportation management",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["SAP Extended Warehouse Management", "Oracle Fusion Cloud Warehouse Management", "Kӧrber WMS", "Other", "None"],
                            label: "",
                            help: "Warehouse management",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["SAP SuccessFactors", "SAP HCM", "Oracle HCM", "Oracle Fusion HCM", "Workday HCM", "Other", "None"],
                            label: "",
                            help: "HCM",
                            value: "",
                            required: true
                        },
                    ]
                },
                {
                    title: "Are there any other core systems you currently have or are implementing?",
                    content: "Include how you use the system and the level of implementation.",
                    fields: [
                        {
                            type: "text",
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            title: "Part 2: Your strategic transformations",
            content: "Aligning automation with transformative efforts ensures you don’t just automate for the sake of it but rather to drive value in line with overall strategic objectives.",
            children: [
                {
                    title: "What best describes your organization’s strategic transformations in these core categories",
                    content: "",
                    fields: [
                        {
                            type: "select",
                            options: ["Strategically moving our infrastructure to the cloud","Tactically evaluating cloud initiatives on a case-by-case basis","Prefer to remain on-premises"],
                            label: "",
                            help: "Cloud",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Use SAP S/4HANA Cloud and/or in RISE with SAP","Planning on moving to S/4HANA Cloud","Use SAP ERP on-prem and not changing","Use Oracle Fusion","Planning on moving to Oracle Fusion","Use Oracle EBS/PeopleSoft/JDE and not changing","Use a cloud-based ERP that's not SAP or Oracle","Use an ERP that's not SAP or Oracle and planning to move to a cloud environment","Use an on-prem ERP that's not SAP or Oracle and not changing"],
                            label: "",
                            help: "ERP",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Successfully implemented data fabrics that integrate and govern all data across our business applications","Currently use select data integration technologies like iPaaS, ETL and EDI but have not yet fully implemented an integrated data fabric across all business applications","Our business applications are mostly integrated and we do not use dedicated data integration technologies"],
                            label: "",
                            help: "Data fabrics",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Our usage of and investment in AI will be limited, as we do not believe that it will significantly impact our overall business success","We believe that AI will be beneficial to our business success and have started to deliver the first POCs and use cases","We’ve seen firsthand how AI enhances business outcomes through multiple operational use cases, and we’re committed to accelerating our strategic approach to AI"],
                            label: "",
                            help: "AI",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Already automated many repetitive business and IT processes in a tactical way on a case-by-case basis and believe there is very little left to automate ","Although we've already automated many repetitive business and IT processes across our organization, we see great opportunity to automate more and have a dedicated automation team streamlining that effort","While we have automated many business and IT processes with our central automation team, we aspire to fully automate processes to deliver the best possible business results and reduce manual efforts"],
                            label: "",
                            help: "Process automation",
                            value: "",
                            required: true
                        },
                    ]
                },
                {
                    title: "What is your level of automation in critical business processes?",
                    content: "These are common IT and business processes driving business outcomes — and all can be fully automated end to end across your tech stack. We'll provide more information and recommendations on the processes applicable to your business.",
                    fields: [
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Demand-to-fulfillment",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Hire-to-retire",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Incident-to-resolution",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Record-to-report",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Order-to-cash",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Plan-to-produce",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Procure-to-pay",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Completely automated end to end","Partially automated","Interested in automating","Not applicable"],
                            label: "",
                            help: "Quote-to-cash",
                            value: "",
                            required: true
                        },
                    ]
                },
                {
                    title: "Given you're in the utilities industry, how automated is your meter-to-cash process?",
                    content: "",
                    conditions: "",
                    fields: [
                        {
                            type: "checkboxes",
                            options: ["Completely automated end to end", "Partially automated", "Interested in automating", "Not applicable"],
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "What other key business processes are you automating or would you like to automate?",
                    content: "Include your level of automation: whether the process is automated end to end, partially automated or you would like to automate",
                    fields: [
                        {
                            type: "textarea",
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            title: "Part 3: Your operations",
            content: "This is the final section. When it comes to automation, it's important to consider how you operate to determine the most strategic approach. ",
            children: [
                {
                    title: "Which software solutions do you use for ITSM and ITOM?",
                    content: "IT automation can cut repetitive tasks by as much as 80%, allowing IT teams to shift their focus from routine maintenance to higher-value, strategic initiatives. This shift enables IT teams to contribute meaningfully to innovation and growth discussions, ultimately supporting better business alignment and agility. Knowing your current solutions can help us identify automation opportunities.",
                    fields: [
                        {
                            type: "checkboxes",
                            options: ["ServiceNow", "SAP Solution Manager", "SAP Cloud ALM", "IBM ITOMaaS", "BMC Helix Operations Management", "Atlassian", "Dynatrace", "Other"],
                            label: "",
                            help: "",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "Which automation solutions do you current use?",
                    content: "",
                    fields: [
                        {
                            type: "select",
                            options: ["Automation Anywhere","Blue Prism","IBM RPA","Microsoft Power Automate","Nintex","Oracle Integration Cloud RPA","UIPath","Salesforce\/MuleSoft RPA","SAP Build Process Automation","Other","None"],
                            label: "",
                            help: "Robotic process automation (RPA)",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Biztalk","Boomi","IBM iPaaS","Informatica","Jitterbit","MuleSoft","Oracle Cloud Integration","Oracle Fusion Middleware","SAP Integration Suite","TIBCO","Workato","Other","None"],
                            label: "",
                            help: "iPaaS/API platform/Service bus",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["ActiveBatch by Redwood","RunMyJobs by Redwood","SAP BPA by Redwood","Tidal by Redwood","BMC Control-M","BMC Helix Control-M","Broadcom Automic/UC4","Broadcom AutoSys","Broadcom CA 7","Fortra’s JAMS","IBM/HCL Workload Automation","Stonebranch","Other","None"],
                            label: "",
                            help: "Workload automation",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Cerberus by Redwood","JSCAPE by Redwood","Axway","Globalscape","GoAnywhere","IBM Aspera","Progress MFT","Seeburger","Other","None"],
                            label: "",
                            help: "Managed file transfer (MFT) and EDI",
                            value: "",
                            required: true
                        },
                        {
                            type: "select",
                            options: ["Appian","Bizagi","IBM Business Automation Workflow","Nintex","Oracle BPM","Pega","SAP Build","SAP Signavio","ServiceNow","Other","None"],
                            label: "",
                            help: "BPM + low code/no code (LCNC)",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "Get your results and recommendations!",
                    content: "See where your organization most likely stands in automation maturity and get recommendations on how to advance. Along with clear acttion items, receive additional resources",
                    fields: [
                        {
                            type: "email",
                            label: "",
                            help: "Business email address required",
                            value: "",
                            required: true
                        }
                    ]
                },
                {
                    title: "What's your name?",
                    content: "",
                    navigation: [
                        {
                            label: "Submit <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' width='2ch' fill='currentColor'><path d='M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z'/></svg>",
                            action: "submit"
                        },
                    ],
                    fields: [
                        {
                            type: "text",
                            label: "",
                            help: "Name",
                            value: "",
                            required: true
                        },
                        {
                            type: "text",
                            label: "",
                            help: "Company",
                            value: ""
                        }
                    ]
                }
            ]
        },
    ],
    selected: null,
    index: null,
    get canNavigate() {
        return true
    },
    navigate(nextIndex) {
        const currentIndex = this.index.indexOf(this.selected);
        switch (nextIndex) {
            case "prev":
                nextIndex = currentIndex-1;
                break;
            case "next":
                nextIndex = currentIndex+1;
                break;
        }
        const isOutOfRange = nextIndex > this.index.length-1 || nextIndex < 0;
        
        this.selected = this.index.at(isOutOfRange ? currentIndex : nextIndex);
    },
    toId(str) {
        return str
            .toLowerCase()
            .trim()
            .normalize('NFD')                 
            .replace(/[\u0300-\u036f]/g, '')   
            .replace(/\s+/g, '-')              
            .replace(/[^\w-]/g, '')            
            .replace(/^-+|-+$/g, '')           
            .replace(/-+/g, '-');              
        
        return /^[a-z]/.test(id) ? id : 'id-' + id; 
    },
    mounted() {
        function flatten(arr) {
            return arr.flatMap(item => {
                const result = [item];
                if (item.children && item.children.length) {
                    result.push(...flatten(item.children));
                }
                return result;
            });
        }

        
        this.index    = flatten(this.sections);
        this.navigate(0);    
        
    }
    
}).mount()