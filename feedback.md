# round 1
* I really wanted the first slide to SHOW the transition when the magnetic field is applied, not just show a spin precessing. Really the point is to show the spin aligning with the magnetic field
* We don't really want to use the 3d representation throughout the presentation. So let's also show a top down view and the colored arrow version.
* make the 3d view isometric angle (like starcraft)
* don't use a rainbow colormap for phase, maybe twilight from matplotlib
# round 2
* the thermal jitter is way too distracting and not the point of the first fucking slide. I want to say "here's an a atom with the spin at some random angle. watch it align when I turn on the magnetic field"
* i want all three views specified visible at the same time, the point is to quickly and efficiently convey that they're equivalent
# round 3
* I think we need a visualization of the rf frequency on slide 2
* Pacing of the pulses on slide 3 isn't doing it for me. Let's make that slider that turns on the RF while the user has clicked on it. The idea is for me to slide the RF frequency around and show the spike of activityx
* The phase color would work better as a background color. maybe with lightness or saturation to represent magnitude 
* Slide 3 is sorely missing a representation of the field strength
* let's have the slide number thing let me click to select a slide to jump to
# round 4
* the visualizations of rf frequency looked nearly identical for all three pulses
* I don't want you to play three pulses on slide 2 anymore, a slider like the one on 
* for both of the RF pulse sliders, let's change it to apply the pulse when I release them
* the phase color patches are way too dark. Need a brighness slider so that I can adjust this on the fly. Make it a thing that's normally small or hidden and pops up on mouseover.
* write a condensed summary/log of what you've done today
# round 5
* There's an orange/gold arrow, presumably to represent magnetic field. It's up in all 3 views. Pretty sure that's wrong for both top down views
* we're still missing a visual of the RF pulse and frequency in slides 2 and 3. A running plot of signal amplitude might be good
# round 6
* for slide 2, let's add some tracking of observations, so that we can build up a frequency response curve as we run pulses
* overall style, let's dial back heading sizes etc. focus on the interactive dashboard
* let's start building slide 4
* slide 3 really needs to show the magnatic field as a spatial variable
# round 7
* headings are still massive. The focus should be on the simulation dashboard, not text
* attempting to go to slides 4/5 seems to redirect to 3?
# round 8
* THE HEADINGS ARE STILL FUCKING MASSIVE!!!!
# round 9
* after slide 2, we don't need to keep the 3d isometric view, it's just overcomplicating things
* the gradient field representation on 3 is a good start. I think that a filled area chart would work a bit better. Also, they could be a separate subplot above each set of atoms, rather than trying to have the gradient line on top of the existing plot.
* slide 5 would work better with 0 gradient on open.
* for slide 5, let's make sure the gradient visualization from earlier is present 
* for slide 6, let's reset to uniform initial phase when we make an adjustment
# round 10
* let's put on a slider for gradient strength in slide 3. Max range should be the current value, slide should load with zero gradient.
* let's add a pulse button to slide
* the field/frequency bar isn't showing any information. I'm also dubious of the design. Let's make this a 3rd plot the to the right of the existing atom grids
* add an arrow to indicate 2d gradient strength/direction on slide 2.
* slide 5 definitely needs the filled area representation of field strength 
# round 11
* on slide 3 the phases seem pretty random and don't seem to remain consistent when the applied gradient is 0
* the rf pulse visulaization on slide 3 is a noisy mess, not showing smooth curves
* combined signal plot should be filled area chart with the filled area close to solid color
# round 12
* I'm still not delighted with use of screen real estate. Can we get the the heading and text to display next to the slide. Let's also ditch the "mri made visible"
* slide 3 appears to simulate spatial sensitivity/selectivity when the gradient is 0, this is physically inaccurate. When there's no gradiant, the rf pulse should impact all atoms uniformly
* let's expand the time range a bit on the signal visuzalization on slide 7. Let's also give it a fixed vertical scale. Give it a some more height. It'd be find to shrink the atom grids a little to make room for this.
# round 13 
* the larger signal strenth curves look good. We still seem to be autoscaling the vertical axis, which is a distracting. These need a FIXED VERTICAL SCALE!!!
* slide 3 still shows spatial selectivity when gradient is 0. This is physically wrong. Spatial selectivity comes from different atoms having different natural frequencies and matching or not matching the rf pulse frequency. This ruins the slide and needs to be fixed!
# round 14
* the rf pulse on slide 3 is nice, let's add that to subsequent slides
* the 