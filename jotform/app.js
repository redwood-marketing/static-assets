const { createApp } = Vue;

createApp({
    data() {
        return {
            selected: null,
            registry: null,
            testMode: window.location.search.includes("test")
        }
    },
    computed: {
        canNavigate() {
            if ( this.selected?.fields ) {
                return this.selected.fields.every(field => (field.required && field.value.length) || field.required == false);
            }
            return true
        }
    },
    methods: {
        checkVisibility(section = this.selected, fields = this.getResults()) {
            if (!section?.conditions) return true;

            return section.conditions.every((condition) => fields[condition.field] == condition.rule);

        },
        navigate(nextIndex) {
            const currentIndex = this.registry?.indexOf(this.selected);
            // const findNextIndex = (index = currentIndex, currentIndex) => {

            //     history = history ?? [];
            //     const nextIndex = index == "next" ? index+1 : index-1;
            //     const adjacentItemIsAllowed = this.checkVisibility(this.registry.at(nextIndex));

            //     if ( !adjacentItemIsAllowed ) {
            //         history.push(index);
            //         return findNextIndex(nextIndex);

            //     }

            //     return nextIndex;



            // };
            switch (nextIndex) {
                case "prev":
                    nextIndex = currentIndex-1;
                    break;
                case "next":
                    nextIndex = currentIndex+1;
                    break;
            }
            const isOutOfRange = nextIndex > this.registry?.length-1 || nextIndex < 0;
            
            this.selected = this.registry?.at(isOutOfRange ? currentIndex : nextIndex);
        },
        toId(str) {
            
            return str?.toLowerCase()
                .trim()
                .normalize('NFD')                 
                .replace(/[\u0300-\u036f]/g, '')   
                .replace(/\s+/g, '-')              
                .replace(/[^\w-]/g, '')            
                .replace(/^-+|-+$/g, '')           
                .replace(/-+/g, '-');              
            
            return /^[a-z]/.test(id) ? id : 'id-' + id; 
        },
        validate(event) {
            event.target.checkValidity()
        },
        getResults() {
            results = [];
            this.registry?.forEach(item => {
                if ( item.fields ) {
                    item.fields.forEach(field => {
                        results[field.id] = field.value;
                    })
                }
                
            })
            return results;
        },
        formatResults() {
            results = [];
            this.registry?.forEach(item => {
                if ( item.fields ) {
                    results.push(`\nQ: ${item.title}`);
                    item.fields.forEach(field => {
                        if ( field.value != "" ) {
                            results.push(`${field.label ?? 'A'}: ${typeof field.value === "string" ? field.value : field.value.join(", ")}`)
                        }
                    })
                }
                
            })
            return results.join(`\n`).trim();
        },
        getRedirectURL() {
            if (!this.registry) return `https://one.redwood.com/automation-maturity-assessment-general-recommendations`;

            const results = this.getResults();
            const levels = this.registry?.at(13)?.fields;
            const FA = [
                results["procure-to-pay-automation-level"], 
                results["order-to-cash-automation-level"], 
                results["record-to-report-automation-level"]
            ];
            const WLA = results["workload-automation-solution"];
            const MFT = results["mft-edi-solution"];
            const ERP = results["erp"];

            

            const rules = [
                {
                    name: "autonomous", 
                    condition: 
                        MFT.includes("by Redwood") 
                        && WLA.includes("by Redwood") 
                        && levels.every(item => item.value.includes("Completely")),
                },
                {
                    name: "controlled-redwood",
                    condition: WLA.includes("by Redwood"),
                },
                { 
                    name: "controlled",
                    condition: 
                        (WLA != "" && (!WLA.includes("by Redwood") && WLA != "None"))
                        && FA.some(item => item.includes("Completely"))
                },
                { 
                    name: "managed",
                    condition: 
                        (WLA != "" && (!WLA.includes("by Redwood") && WLA != "None"))
                        && !FA.some(item => item.includes("Completely"))
                        && FA.some(item => item.includes("Partially")),
                },
                { 
                    name: "siloed-sap",
                    condition: 
                        ERP.includes("SAP")
                        && WLA == "None"
                        && FA.some(item => item.includes("Completely") || item.includes("Partially")),
                },
                { 
                    name: "manual-sap",
                    condition: 
                        ERP.includes("SAP")
                        && WLA == "None"
                        && FA.some(item => item.includes("Interested") || item.includes("Not applicable")),
                },
                { 
                    name: "siloed",
                    condition: 
                        !ERP.includes("SAP")
                        && WLA == "None"
                        && FA.some(item => item.includes("Completely") || item.includes("Partially")),
                },
                { 
                    name: "manual",
                    condition: 
                        !ERP.includes("SAP")
                        && WLA == "None"
                        && FA.some(item => item.includes("Interested") || item.includes("Not applicable")),
                },
            ]

            return `https://one.redwood.com/automation-maturity-assessment-${rules.find(rule => rule.condition === true)?.name ?? 'general-recommendations'}`;
        },
        async getPayload() {
            try {
                const response = await fetch(window.location.origin+"/jotform/payload.json");
                if (!response.ok) {
                    throw new Error(`Failed to load payload: ${response.status}`);
                }
                const payload = await response.json();
                return payload;
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        const flatten = (arr) => {
            return arr.flatMap((item, index) => {
                const result = [item];
                if (item.children && item.children.length) {
                    result.push(...flatten(item.children));
                }
                return result;
            });
        }

        this.getPayload().then(sections =>  {
            this.registry = flatten(sections);
            this.navigate(0);
        });

        if ( "MktoForms2" in window === false ) {
            const mkto = document.createElement("script");
            mkto.src = "https://one.redwood.com/js/forms2/js/forms2.min.js";
            
            mkto.addEventListener("load", () => {
                MktoForms2.loadForm("//one.redwood.com", "207-QIS-684", 1534, function(form) {

                    /* Remove default styles */
                    (function removeDefaultMarketoStyles() {
                        const formElem 		  = form.getFormElem()?.get(0);
                        const styledElems 	  = formElem.querySelectorAll("[style]");
                        const formInnerStylesheets = formElem.querySelectorAll("style")
                        const mktoStylesheets = [...document.styleSheets].filter((sheet) => sheet?.ownerNode?.id.includes("mkto") );
                        
                        [...styledElems, formElem].forEach( (el) => el.removeAttribute('style') );
                        formInnerStylesheets.forEach( (sheet) => sheet.remove() );
                        mktoStylesheets.forEach( (sheet) => sheet.disabled = true );
                    })();

                    /* Populate */
                    form.onSubmit(() => {
                        form.setValues({
                            Comments__c: this.formatResults()
                        });
                    });

                    form.onSuccess((values, followUpUrl) =>  {
                        window.top.location = this.getRedirectURL();
                        return false;
                    });
                }.bind(this));
            });
            
            document.body.appendChild(mkto);
        }
        
        
    }
    
}).mount('#app')