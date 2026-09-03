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
* the vertical scale for the signal is still autoscaling, instead of being fixed. this is distracting AF and bad for the presentation
* I'd like to add slide 8, which will be heavily based on slide 7. The key difference is that we'll a handful atom grids with patterns of missing atoms, to demonstrate how the developing phase shifts will cause signal spikes. This is essentially a jank intro to fourier series/transforms. So a battern of vertical bands, would be interesting, maybe some diagonal bands.
# round 15
* slide 8 needs some work. Trying to show the multiple patterns at once isn't working at all. let's add some small buttons to call up the different patterns, so that we can focus on them one at a time.
* review how round 15 actually works. We definitely want the signal to respond accurately to the pattern of atoms.
# round 16
* slide 8 doesn't make a lot of sense unless I can apply gradients to cause phase shifts. plz add
* the signal plot on slide 8 is wonky. After filling for the first time, the plot kinda breaks and doesn't display accurate data
# round 17
* "mri, made visible" should be removed
* the heading and text should be to the right of the slide select, not below them. We want to maximize screen real estate available to the visulaizations. If it comes to it'll delete the fucking heading and text from the presentation if we can't get them to behave as required
* given that we're not handing IQ signals, let's keep the patterns on slide 8 symmetric around the center.
# round 18
* "vertical bands" on slide 8 is now just a solid grid, with no missing atoms
* still don't have the ability to apply gradients on slide 8
# round 19
* the signal strength graph is still autoscaling. normalize by the number of atoms on the grid! We can't have this jumping around. THIS IS A HUGE FUCKING PROBLEM!!!
* need rf pulse button all the later slides !!!
* the heading and text are still below the slide select, wasting space like crazy.  FIX THIS OR GET RID OF THIS SHITTY TEXT
* vertical bands pattern is still a solid block, not vertical bands!!!
# round 20
* the signal filled area plot is still lousy. Scale should be normalized by number of atoms and go from -1 to 1 and the filled area should be from signal value to 0. It's also giving obviously wrong results for 0 gradient conditions after filling the plot for the first time. Instead of the constant signal, it's 0 at the left and. Generally, this plot is a mess. rethink strategy
* rf pulse button still missing from slide 4 onward!
* gradients should be applied to grids s.t. the gradient crosses 0 at the center of the grid
# round 21
* the signal plot is a lot better. The filled area part is still jacked up. Ditch it and just have the line
* let's increase the time range of the signal plot. make it 3 x current value
# round 22
Let's add an introductory slide at the start.
Use this image on the left https://www.medicalgraphics.de/en/product/mri-scanner/ (cite correctly)
Here are my bullet points (don't generate content/text here)

* Originally chemcial composition measurement (NMR), turned into imaging
* See inside the body without ionizing radiation
* Many imaging modalities from one piece of hardware, via software
* Natural conneciton to signal processing mathw
# round 23
let's try to add a slide to show velocimetry with MRI. First we'll show a signle atom on a grid, centered halfway to the right from center. We'll have a pre-programmed sequence to apply and RF pulse with a gradient in X. after a 3 seconds, the gradient will reverse for 3 seconds. The single atom should undergo phase shift during both gradients but cancel out to zero.

then we'll do the same thing with a moving atom (start at center and move slowly to the same position as first atom). In this case the atom will undergo different phase shifts on the first and second gradients, because it will be exposed to different fields
# round 24
can we make the gradient sequence tracker on slide 10 a slider that I can interact with to control the position in the playback?