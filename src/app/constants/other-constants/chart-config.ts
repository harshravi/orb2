declare var _: any;
declare var Highcharts: any;

export const CHART_CONFIG = {
    'graphConfig': {
        'ACTIVITY': {
            'name': 'Activity',
            'yAxis': {
                'title': {
                    'text': ''
                },
            },
            'tooltip': {
                'useHTML': true,
                'formatter': function () {
                    return Highcharts.dateFormat('%A, %b %e, %H:%M', new Date(this.x)) + '<br/><ul><li><b>Calories : ' +
                        this.points[0].point.calories + ' cals</b></li><li><b>Steps : ' + this.points[0].point.steps +
                        ' steps</b></li><li><b>Distance : ' + this.points[0].point.distance + '&nbsp;miles</b></li>';
                }
            },
            'type': 'column',
            'exporting': {
                'buttons': {
                    'customButton': {
                        'x': -62,
                        'symbol': 'circle',
                        'menuItems': [
                            {
                                'text': 'Test',
                                'onclick': function () { alert('Test'); }
                            }
                        ]
                    }
                }
            }
        },
        'BP': {
            'type': 'line',
            'yAxis': {
                'title': {
                    'text': ''
                },
            },
            'tooltip': {
                'useHTML': false,
                'xDateFormat': '%A, %b %e, %H:%M'
            },
        },
        'BG': {
            'type': 'line',
            'yAxis': {
                'title': {
                    'text': ''
                },
            },
            'tooltip': {
                'useHTML': false,
                'formatter': function () {
                    let beforeMealComponent = '';
                    let afterMealComponent = '';
                    let flag = 0;
                    _.each(this.points, (point) => {
                        if (point.point.mealType === 'before') {
                            flag++;
                        } else if (point.point.mealType === 'after') {
                            flag++;
                        }
                    });
                    _.each(this.points, (point) => {
                        if (point.point.mealType === 'before') {
                            beforeMealComponent = '<br/><ul><li><b>Before Meal : ' + this.points[0].y + ' mg/dL</b></li>';
                        } else if (point.point.mealType === 'after') {
                            if (flag === 2) {
                                afterMealComponent = '<br/><ul><li><b>After Meal : ' + this.points[1].y + ' mg/dL</b></li>';
                            } else {
                                afterMealComponent = '<br/><ul><li><b>After Meal : ' + this.points[0].y + ' mg/dL</b></li>';
                            }

                        }
                    });
                    return Highcharts.dateFormat('%A, %b %e, %H:%M', new Date(this.x)) + beforeMealComponent + afterMealComponent;
                }
            },
        },
        'O2S': {
            'type': 'spline',
            'marker': {
                'symbol': 'circle'
            },
            'tooltip': {
                'useHTML': false,
                'xDateFormat': '%A, %b %e, %H:%M'
            },
            'zones': [
                {
                    'value': 91,
                    'color': '#e74c3c'
                },
                {
                    'value': 96,
                    'color': '#f1c40f'
                },
                {
                    'value': 101,
                    'color': '#2ecc71'
                },
                {
                    'color': '#2ecc71'
                }],
            'yAxis': {
                'title': {
                    'text': ''
                },
                'min': 80,
                'max': 100
            }
        },
        'DEVELOPMENT': {
            'type': 'line',
            'marker': {
                'symbol': 'circle'
            },
            'yAxis': {
                'gridLineWidth': 0,
                'title': {
                    'text': '(%)', // For title to go on the Top eg (L)
                    'rotation': 0, // Rotate the Label to 0 degree imn order to make it horizontal as we see it
                    'margin': 0, // Mange the margin of the label in order to get it fixed properly
                    'y': -150 // Y Axis offset, starts from the center which leads negative offset to move it up and positive to move it down.
                },
                'min': 0
            },
            'tooltip': {
                'useHTML': true,
                'formatter': function () {
                    return Highcharts.dateFormat('%A, %b %e, %H:%M', new Date(this.x)) +
                        '<br/><ul><li><b>Weight : ' + this.points[0].point.y + ' lbs</b></li><li><b>BMI : ' + this.points[0].point.bmi;
                }
            }
        },
        'HR': {
            'type': 'spline',
            'marker': {
                'symbol': 'circle'
            },
            'yAxis': {
                'title': {
                    'text': ''
                }
            },
            'tooltip': {
                'useHTML': false,
                'xDateFormat': '%A, %b %e, %H:%M'
            },
        },
        'PEF': {
            'type': 'line',
            'marker': {
                'symbol': 'circle'
            },
            'yAxis': {
                'title': {
                    'text': ''
                },
            },
            'tooltip': {
                'useHTML': false,
                'xDateFormat': '%A, %b %e, %H:%M'
            }
        },
        'FLUID': {
            'type': 'column',
            'stacking': 'normal',
            'yAxis': {
                'title': {
                    'text': ''
                },
            },
            'tooltip': {
                'useHTML': false,
                'formatter': null
            }
        },
        'LUNG': {
            'type': 'line',
            'marker': {
                'symbol': 'circle'
            },
            'yAxis': {
                'gridLineWidth': 0,
                'title': {
                    'text': '(%)', // For title to go on the Top eg (L)
                    'rotation': 0, // Rotate the Label to 0 degree imn order to make it horizontal as we see it
                    'margin': 0, // Mange the margin of the label in order to get it fixed properly
                    'y': -150 // Y Axis offset, starts from the center
                    // which leads negative offset to move it up and positive to move it down.
                },
                'min': 0
            },
            'tooltip': {
                'useHTML': false,
                'xDateFormat': '%A, %b %e, %H:%M'
            }
        }
    }
};

