using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeCatch.Data;
using TimeCatch.Models;

namespace TimeCatch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeRegistrationsController : ControllerBase
    {
        private readonly TimeCatchContex _context;

        public TimeRegistrationsController(TimeCatchContex context)
        {
            _context = context;
        }

        // GET: api/TimeRegistrations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TimeRegistration>>> GetTimeRegistration()
        {
            return await _context.TimeRegistration.ToListAsync();
        }

        // GET: api/TimeRegistrations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TimeRegistration>> GetTimeRegistration(int id)
        {
            var timeRegistration = await _context.TimeRegistration.FindAsync(id);

            if (timeRegistration == null)
            {
                return NotFound();
            }

            return timeRegistration;
        }

        // PUT: api/TimeRegistrations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimeRegistration(int id, TimeRegistration timeRegistration)
        {
            if (id != timeRegistration.Id)
            {
                return BadRequest();
            }

            _context.Entry(timeRegistration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimeRegistrationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TimeRegistrations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TimeRegistration>> PostTimeRegistration(TimeRegistration timeRegistration)
        {
            _context.TimeRegistration.Add(timeRegistration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimeRegistration", new { id = timeRegistration.Id }, timeRegistration);
        }

        // DELETE: api/TimeRegistrations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TimeRegistration>> DeleteTimeRegistration(int id)
        {
            var timeRegistration = await _context.TimeRegistration.FindAsync(id);
            if (timeRegistration == null)
            {
                return NotFound();
            }

            _context.TimeRegistration.Remove(timeRegistration);
            await _context.SaveChangesAsync();

            return timeRegistration;
        }

        private bool TimeRegistrationExists(int id)
        {
            return _context.TimeRegistration.Any(e => e.Id == id);
        }
    }
}
